const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcmMnH4yvxlsVlTnq31xbA5Hkdz1qiOYPFkZBehuOEhuPZUrft1njmvaVaIxwBDYsMXaV866Bc9bPD/pub?gid=0&single=true&output=csv";

function getDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  return "desktop";
}

fetch(csvURL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // skip header
    const device = getDevice();
    const container = document.getElementById("offers");

    rows.forEach(row => {
      // Added 'button' as 4th column
      const [image,title,subtitle,button,android,ios,desktop] = row.split(",");

      let link = desktop;
      let btnText = button || "Continue"; // Default if empty

      if (device === "android") link = android;
      if (device === "ios") link = ios;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${image}">
        <div class="card-content">
          <h2>${title}</h2>
          <p>${subtitle}</p>
          <a class="btn" href="${link}" target="_blank">${btnText}</a>
        </div>
      `;
      container.appendChild(card);
    });
  });
