async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatlog = document.getElementById("chatlog");
  chatlog.innerHTML += `<div class="msg user"><strong>You:</strong> ${message}</div>`;
  input.value = "";
const apiBase = "https://lawncare-backend.onrender.com";

const response = await fetch(`${apiBase}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Hello" })
});

  const data = await response.json();
  chatlog.innerHTML += `<div class="msg bot"><strong>Bot:</strong> ${data.reply}</div>`;
}
