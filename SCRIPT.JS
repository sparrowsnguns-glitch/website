const feed = document.getElementById("feedList");

/* FAKE LIVE THREATS */
const threats = [
  "Login attempt blocked (IP: 185.x.x.x)",
  "Unusual API request pattern detected",
  "Backup integrity verified",
  "New vulnerability signature updated",
  "Suspicious IAM escalation attempt blocked"
];

function addThreat() {
  const item = document.createElement("li");
  item.textContent = threats[Math.floor(Math.random() * threats.length)];
  feed.prepend(item);

  if (feed.children.length > 6) {
    feed.removeChild(feed.lastChild);
  }
}

setInterval(addThreat, 2000);

/* AI SIMULATION */
function askAI() {
  const input = document.getElementById("ask").value;
  const response = document.getElementById("response");

  let output = "";

  if (input.toLowerCase().includes("nis")) {
    output = "System Analysis: Sie sind wahrscheinlich betroffen. Empfehlung: sofortige Gap-Analyse durchführen.";
  } else if (input.toLowerCase().includes("risiko")) {
    output = "Höchstes Risiko liegt in Identity Management und fehlender Backup-Resilienz.";
  } else {
    output = "Analyse läuft... Relevante Sicherheitsdaten werden aggregiert.";
  }

  response.innerHTML = `<p style="margin-top:15px;color:#7aa2ff">${output}</p>`;
}
