import { closeModal } from "./closeModal.js";
import { successAlert } from "./successAlert.js";
import { updateUI } from "./updateNavUI.js";

const name = document.querySelector(".name__register");
const username = document.querySelector(".username__register");
const password = document.querySelector(".password__register");
const registerBtn = document.getElementById("registerBtn");
const registerModal = document.querySelector("#register");

registerBtn.addEventListener("click", async function () {
  if (!name.value && !username.value && !password.value) return;
  const response = await fetch("https://tarmeezacademy.com/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      username: username.value,
      password: password.value,
    }),
  });

  const { token, user } = await response.json();

  // 1. Save toket & user in Local Storage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  // 2. Close login modal
  closeModal(registerModal);
  // 3. Display success message
  successAlert("New user has added", 3);
  // 4. Update Navbar UI
  updateUI();
});
