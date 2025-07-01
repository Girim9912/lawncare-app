document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = {
    services: form.get("services").split(",").map(s => s.trim()),
    lot_size: parseInt(form.get("lot_size")),
    location: form.get("location"),
    special_requirements: form.get("special_requirements")
  };

  try {
    const res = await fetch("https://lawncare-backend.onrender.com/api/generate-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("quoteResult").innerHTML = `<pre>${result.quote}</pre>`;
  } catch (err) {
    document.getElementById("quoteResult").textContent = "Failed to fetch quote.";
    console.error("Quote error:", err);
  }
});
