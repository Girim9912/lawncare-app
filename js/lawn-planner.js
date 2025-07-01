document.getElementById("lawnForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());

  // TODO: Replace with your actual backend API URL
  const response = await fetch("https://your-backend-url/api/plan-lawn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  document.getElementById("output").innerHTML = `
    <h3>Recommended Zones:</h3>
    ${result.layout.map(zone => `<p>${zone}</p>`).join("")}
    <h4>Drainage Tips:</h4>
    <p>${result.drainageAdvice}</p>
    <h4>Materials:</h4>
    <ul>${result.materials.map(m => `<li>${m}</li>`).join("")}</ul>
  `;
});
