import { successAlert } from "./successAlert.js";
import { updateUI } from "./updateNavUI.js";
import { getAllPost } from "./getAllPosts.js";
const logoutBtn = document.querySelector(".logoutBtn");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  updateUI();
  getAllPost();
  successAlert("Logout Successfully", 3);
});
