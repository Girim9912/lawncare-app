async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatlog = document.getElementById("chatlog");
  chatlog.innerHTML += `<div class="msg user"><strong>You:</strong> ${message}</div>`;
  input.value = "";

  try {
    const res = await fetch("https://lawncare-backend.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatlog.innerHTML += `<div class="msg bot"><strong>Bot:</strong> ${data.response}</div>`;
  } catch (error) {
    chatlog.innerHTML += `<div class="msg bot"><strong>Bot:</strong> Sorry, there was an error processing your message.</div>`;
    console.error("Chatbot error:", error);
  }
}
