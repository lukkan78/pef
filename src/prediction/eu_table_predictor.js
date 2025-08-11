import table from "./eu_table.json" assert { type:"json" };

export function predictEU(sex, age, heightCm){
  const T = table[sex];
  if(!T) return null;
  const {ages, heights, pef} = T;

  function clamp(x, arr){ return Math.max(arr[0], Math.min(arr[arr.length-1], x)); }
  const a = clamp(age, ages);
  const h = clamp(heightCm, heights);

  const ai = lowerIndex(ages, a);
  const hi = lowerIndex(heights, h);

  const a0 = ages[ai],    a1 = ages[Math.min(ai+1, ages.length-1)];
  const h0 = heights[hi], h1 = heights[Math.min(hi+1, heights.length-1)];

  const q00 = pef[ai][hi];
  const q01 = pef[ai][Math.min(hi+1, heights.length-1)];
  const q10 = pef[Math.min(ai+1, ages.length-1)][hi];
  const q11 = pef[Math.min(ai+1, ages.length-1)][Math.min(hi+1, heights.length-1)];

  const fa = (a1===a0) ? 0 : (a - a0) / (a1 - a0);
  const fh = (h1===h0) ? 0 : (h - h0) / (h1 - h0);

  const q0 = q00*(1-fh) + q01*fh;
  const q1 = q10*(1-fh) + q11*fh;
  return Math.round(q0*(1-fa) + q1*fa);
}

function lowerIndex(arr, x){
  let i=0;
  while(i+1<arr.length && arr[i+1]<=x) i++;
  return i;
}
