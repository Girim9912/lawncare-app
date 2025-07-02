document.getElementById("diagnoseForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());

  try {
    const res = await fetch("https://lawncare-backend.onrender.com/api/diagnose-lawn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("diagnosisResult").innerHTML = `
      <h3>Diagnosis:</h3>
      <pre>${result.diagnosis}</pre>
      <p><strong>Recommend Professional:</strong> ${result.recommend_professional ? "Yes" : "No"}</p>
    `;
  } catch (err) {
    document.getElementById("diagnosisResult").textContent = "Failed to get diagnosis.";
    console.error("Diagnosis error:", err);
  }
});

