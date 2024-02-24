const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage("right", msgText);
  msgerInput.value = "";

  botResponse(msgText);
});

function appendMessage(side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

async function botResponse(msgTextInput) {
  appendMessage('loading left', 'Đợi mình suy nghĩ chút nhé!');

  await axios({ method: 'post', url: '/test', data: { msgTextInput } })
    .then((res, err) => {
      document.querySelector(".loading").remove();

      msgText = res.data.message;
      appendMessage("left", msgText);
    });;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = `0${date.getHours()}`;
  const m = `0${date.getMinutes()}`;

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
