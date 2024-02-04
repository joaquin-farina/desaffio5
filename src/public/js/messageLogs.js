const socket = io();

let user;

Swal.fire({
  title: "Login",
  input: "text",
  text: "Ingrese su correo de chat:",
  inputValidator: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Ingrese un correo válido para continuar.";
    }
    return !value && "Ingrese un correo válido para continuar.";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("getMessages", user);
});

const chatbox = document.querySelector("#chatbox");

chatbox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let messageLogs = document.querySelector("#messageLogs");
  let mensajes = "";
  data.forEach((mensaje) => {
    mensajes += `<li>${mensaje.user} dice: ${mensaje.message} - ${mensaje.hora}</li>`;
  });
  messageLogs.innerHTML = mensajes;
});
