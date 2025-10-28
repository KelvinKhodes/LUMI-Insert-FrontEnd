export function statusDay(){
  let day;
  const time = new Date().getHours();
  day = 'to see you'
  if(time > 3 && time < 12) day = 'Morning';
  if(time > 11 && time < 16) day = 'Afternoon';
  if(time > 15 && time < 4) day = 'Night';

  return day;
}