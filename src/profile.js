export function loadProfile(){
  return JSON.parse(localStorage.getItem("pef_profile")||"{}");
}
export function saveProfile(p){
  localStorage.setItem("pef_profile", JSON.stringify(p));
}
export function currentAge(birthYear){
  if(!birthYear) return null;
  const now = new Date();
  return now.getFullYear() - Number(birthYear);
}
