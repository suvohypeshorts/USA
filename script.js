const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcmMnH4yvxlsVlTnq31xbA5Hkdz1qiOYPFkZBehuOEhuPZUrft1njmvaVaIxwBDYsMXaV866Bc9bPD/pub?gid=0&single=true&output=csv";

function getDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  return "desktop";
}

// Hide "Loading..." text until CSV loads
document.getElementById("topHeading").innerText = "";

fetch(csvURL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // skip header
    const device = getDevice();
    const container = document.getElementById("offers");

    rows.forEach((row, index) => {
      const [topHeading,image,title,subtitle,button,android,ios,desktop,movie] = row.split(",").map(item => item.trim());

      // Set top heading once (first row only)
      if(index === 0) {
        document.getElementById("topHeading").innerText = topHeading;
      }

      let link = desktop;
      if(device === "android") link = android;
      if(device === "ios") link = ios;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${image}" onclick="window.open('${movie}','_blank')">
        <div class="card-content">
          <h2>${title}</h2>
          <p>${subtitle}</p>
          <a class="btn" href="${link}" target="_blank">${button}</a>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading CSV:", err));
