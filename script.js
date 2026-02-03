const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/offers`;

function getDevice(){
  const ua = navigator.userAgent.toLowerCase();
  if(ua.includes("android")) return "android";
  if(ua.includes("iphone") || ua.includes("ipad")) return "ios";
  return "desktop";
}

async function goOffer(){
  const device = getDevice();
  try{
    const res = await fetch(SHEET_URL);
    const data = await res.json();

    const matches = data.filter(row =>
      row.device.toLowerCase() === device &&
      row.country.toUpperCase() === "US"
    );

    if(matches.length){
      const pick = matches[Math.floor(Math.random()*matches.length)];
      window.location.href = pick.link;
    }else{
      alert("Offer not available for your device.");
    }
  }catch(e){
    alert("Please try again later.");
  }
}