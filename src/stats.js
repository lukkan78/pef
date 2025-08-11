export function dailyBuckets(measurements) {
  const byDay = new Map();
  for (const m of measurements || []) {
    const d = new Date(m.ts); d.setHours(0,0,0,0);
    const key = d.toISOString();
    const arr = byDay.get(key) || [];
    arr.push(m.pef);
    byDay.set(key, arr);
  }
  return [...byDay.entries()]
    .map(([iso, arr]) => ({
      day: iso,
      mean: arr.reduce((a,b)=>a+b,0)/arr.length,
      best: arr.slice().sort((a,b)=>b-a)[0],
      count: arr.length
    }))
    .sort((a,b)=>a.day.localeCompare(b.day));
}

export function rollingAverage(series, windowDays=7, key="best") {
  const out = [];
  const items = (series||[]).map(x => ({...x, dayNum: Date.parse(x.day)}));
  for (let i=0;i<items.length;i++){
    const end = items[i].dayNum;
    const start = end - (windowDays-1)*86400000;
    const win = items.filter(x => x.dayNum>=start && x.dayNum<=end);
    const avg = win.reduce((s, x)=>s + x[key], 0) / (win.length||1);
    out.push({ day: items[i].day, value: avg });
  }
  return out;
}
