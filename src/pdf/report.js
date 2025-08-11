import jsPDF from 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.es.min.js';
import autoTable from 'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js';

export function downloadPefPdf({ profile, daily, roll7, roll14, raw, chartCanvas, period }){
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 48;
  let y = margin;

  doc.setFont('helvetica','bold'); doc.setFontSize(24);
  doc.text('PEF-Rapport', margin, y); y += 24;

  const age = profile?.birthYear ? (new Date().getFullYear() - Number(profile.birthYear)) : null;
  const fromStr = fmtDate(period.from); const toStr = fmtDate(period.to);

  const bestVal   = daily?.length ? Math.max(...daily.map(d=>d.best)) : null;
  const worstVal  = daily?.length ? Math.min(...daily.map(d=>d.best)) : null;
  const meanBest  = daily?.length ? Math.round(avg(daily.map(d=>d.best))) : null;
  const mean7     = roll7?.length  ? Math.round(avg(roll7.map(d=>d.value))) : null;

  const zoneShare = zoneDistribution(raw||[]);

  y += 8;
  doc.setFontSize(11); doc.setFont('helvetica','normal');
  const left = [
    ['Patient', profile?.name || '—'],
    ['Ålder', age ? `${age} år` : '—'],
    ['Kön', profile?.sex==='female'?'Kvinna':profile?.sex==='male'?'Man':'—'],
    ['Längd', profile?.heightCm? `${profile.heightCm} cm` : '—'],
    ['Personbästa', profile?.personalBest? `${profile.personalBest} L/min` : '—']
  ];
  const right = [
    ['Förväntat', profile?.predicted? `${profile.predicted} L/min (${methodLabel(profile?.method)})` : '—'],
    ['Mätperiod', `${fromStr} – ${toStr}`],
    ['Antal mätningar', String((raw||[]).length)],
    ['Medel (bästa/dag)', meanBest? `${meanBest} L/min` : '—'],
    ['7-dagars värde', mean7? `${mean7} L/min` : '—'],
  ];

  drawKeyValueTable(doc, left, margin, y);
  drawKeyValueTable(doc, right, margin+280, y);
  y += 120;

  const variability = (bestVal!=null && worstVal!=null && meanBest) ? Math.round(100*((bestVal-worstVal)/meanBest)) : null;
  autoTable(doc, {
    startY: y, margin: {left: margin, right: margin},
    head: [['Zonfördelning','Andel']],
    body: [
      ['Grön (≥80%)', `${zoneShare.green}%`],
      ['Gul (50–79%)', `${zoneShare.yellow}%`],
      ['Röd (<50%)', `${zoneShare.red}%`],
      ['Variabilitet (daglig skillnad)', variability!=null? `${variability}%` : '—']
    ],
    styles: { font: 'helvetica', fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [240,240,240] }
  });
  y = doc.lastAutoTable.finalY + 16;

  if (chartCanvas) {
    const png = chartCanvas.toDataURL('image/png', 0.92);
    const w = doc.internal.pageSize.getWidth() - margin*2;
    const h = (w * chartCanvas.height) / chartCanvas.width;
    if (y + h > doc.internal.pageSize.getHeight() - margin) { doc.addPage(); y = margin; }
    doc.addImage(png, 'PNG', margin, y, w, h); y += h + 16;
  }

  if (y > doc.internal.pageSize.getHeight() - margin - 120) { doc.addPage(); y = margin; }
  autoTable(doc, {
    startY: y, margin: {left: margin, right: margin},
    head: [['Datum','Tid','Värde','% av förväntat','Zon','Taggar','Anteckning']],
    body: (raw||[]).map(r => {
      const d = new Date(r.ts);
      const pct = profile?.predicted ? Math.round(100*(r.pef / profile.predicted)) + '%' : '—';
      return [fmtDate(d), fmtTime(d), `${r.pef} L`, pct, zoneLabel(r.zone), (r.tags||[]).join(', '), r.note||''];
    }),
    styles: { font: 'helvetica', fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [240,240,240] }
  });

  doc.save(`PEF-rapport_${toStr}.pdf`);
}

function fmtDate(d){ return new Date(d).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }
function fmtTime(d){ return new Date(d).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}); }
function avg(arr){ return arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0; }
function zoneDistribution(raw){
  const n = raw.length||1; const c = {green:0,yellow:0,red:0};
  for (const r of raw){ if (r.zone==='green') c.green++; else if (r.zone==='yellow') c.yellow++; else if (r.zone==='red') c.red++; }
  return { green: Math.round(100*c.green/n), yellow: Math.round(100*c.yellow/n), red: Math.round(100*c.red/n) };
}
function zoneLabel(z){ return z==='green'?'Grön':z==='yellow'?'Gul':z==='red'?'Röd':'—'; }
function methodLabel(m){ return m==='nunn_gregg'?'Nunn & Gregg':'EU-tabell'; }
function drawKeyValueTable(doc, rows, x, y){
  doc.setFontSize(11); let yy=y;
  for (const [k,v] of rows){ doc.setFont('helvetica','bold'); doc.text(k, x, yy); doc.setFont('helvetica','normal'); doc.text(String(v), x+120, yy); yy+=18; }
}
