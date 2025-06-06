document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box-content");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatTitle = document.getElementById("chat-title");
  const chatToggle = document.getElementById("chat-toggle");
  const disclaimerModal = document.getElementById("chat-disclaimer-modal");
  const acceptDisclaimer = document.getElementById("accept-disclaimer");

  const names = ["Josh", "Tyler", "Marcus", "Liam", "Andre", "Ray"];
  const selectedName = names[Math.floor(Math.random() * names.length)];

  // Set title dynamically
  chatTitle.textContent = `Chat with ${selectedName}`;

  // Default greeting
  function addInitialMessage() {
    addMessage(
      "receive",
      `Hi, I'm ${selectedName}. I'm currently experiencing homelessness in Toronto. You can ask me about my experiences, life, or anything you're curious about.`
    );
  }

  function addMessage(type, text) {
    const msg = document.createElement("div");
    msg.className = type === "send" ? "chat-box-body-send" : "chat-box-body-receive";
    msg.innerHTML = `<p>${text}</p><span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    addMessage("send", userText);
    chatInput.value = "";

    const context = `
      This chatbot is designed to simulate a conversation with a homeless person in Toronto, Canada. It is part of a project
      that is raising awareness about homelessness in Canada. I need you to respond and communicate as if you are that person. 
      You can discuss your experiences, challenges, and daily life.
      Please keep your responses realistic and empathetic, reflecting the struggles and realities faced by homeless individuals.
      Remember, this is a sensitive topic, so approach it with care and understanding.
      You can also provide insights into the support systems available, the challenges of finding shelter, and the impact of homelessness on mental health.
      If you are asked about resources, you can mention local shelters, food banks, and community support services in Toronto.
      Please do not provide any personal information or engage in any harmful or inappropriate content.
      Your responses should be respectful and aim to foster understanding and compassion towards the homeless community.
      Do not make responses too long, make it as if you are just texting someone. 
      A default message is shown to the user when they first open the chat, so you do not need to repeat that. The general message is Hi, I'm --a random name--. I'm currently experiencing homelessness in Toronto. You can ask me about my experiences, life, or anything you're curious about.
    `;

    const fullPrompt = `${context}\n\nUser: ${userText}`;

    try {
      const res = await fetch("https://gemini-chatbot-vercel-nu.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: fullPrompt })
      });
      const data = await res.json();
      addMessage("receive", data.response || "❌ No response from Gemini.");
    } catch (err) {
      addMessage("receive", "❌ Error contacting backend.");
    }
  }

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  chatToggle.addEventListener("click", function () {
    document.querySelector(".chat-box").style.visibility = "visible";
    document.querySelector(".chat-button").style.display = "none";
    disclaimerModal.style.display = "flex";
  });

  acceptDisclaimer.addEventListener("click", function () {
    disclaimerModal.style.display = "none";
    setTimeout(addInitialMessage, 300);
  })

  document.getElementById("chat-close").addEventListener("click", function () {
    document.querySelector(".chat-box").style.visibility = "hidden";
    document.querySelector(".chat-button").style.display = "block";
    chatBox.innerHTML = ""; // reset for new session
  });
});
