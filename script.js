fetch(csvURL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // skip header
    const device = getDevice();
    const container = document.getElementById("offers");

    rows.forEach(row => {
      // Trim all values
      const [topHeading,image,title,subtitle,button,android,ios,desktop,movie] = row.split(",").map(item => item.trim());

      // Set top heading from first data row
      if(document.getElementById("topHeading").innerText === "Loading...") {
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
