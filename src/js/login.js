import { closeModal } from "./closeModal.js";
import { dangerAlert } from "./dangerAlert.js";
import { successAlert } from "./successAlert.js";
import { updateUI } from "./updateNavUI.js";

const username = document.querySelector(".username");
const password = document.querySelector(".password");
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.querySelector("#login");

loginBtn.addEventListener("click", async function () {
  if (!username.value && !password.value) return;
  try {
    const response = await fetch("https://tarmeezacademy.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const { token, user } = await response.json();

    console.log(token);

    // 1. Save toket & user in Local Storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    // 2. Close login modal
    closeModal(loginModal);
    // 3. Display success message
    successAlert("Login successfully", 3);
    // 4. Update Navbar UI
    updateUI();
    // 5. Adding Avatar
    document.querySelector("#userAvatar").src =
      user.profile_image || "../imgs/user.png";
  } catch (error) {
    dangerAlert(error.message, 2);
  }
});
