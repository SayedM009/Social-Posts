import { closeModal } from "./closeModal.js";
import { dangerAlert } from "./dangerAlert.js";
import { successAlert } from "./successAlert.js";
import { updateUI } from "./updateNavUI.js";
import { getAllPost } from "./getAllPosts.js";

const name = document.querySelector(".name__register");
const username = document.querySelector(".username__register");
const password = document.querySelector(".password__register");
const userImage = document.querySelector(".userImage");
const registerBtn = document.getElementById("registerBtn");
const registerModal = document.querySelector("#register");

registerBtn.addEventListener("click", async function () {
  try {
    if (!name.value && !username.value && !password.value) return;
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("image", userImage.files[0]);

    const response = await fetch("https://tarmeezacademy.com/api/v1/register", {
      method: "POST",
      body: formData,
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
    // 5. Re-fetch all Posts
    getAllPost();
    // 6. Adding Avatar
    document.querySelector("#userAvatar").src = user.profile_image;
  } catch (error) {
    dangerAlert(error.message, 2);
    closeModal(registerModal);
  }
});
