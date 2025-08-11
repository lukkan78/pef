import { predictEU } from "./eu_table_predictor.js";
import { predictNG } from "./nunn_gregg.js";

export function predictedPEF({sex, age, heightCm}, method="eu_table"){
  if(!sex || !age || !heightCm) return null;
  if(method==="nunn_gregg") return predictNG(sex, age, heightCm);
  return predictEU(sex, age, heightCm);
}
