import { successAlert } from "./successAlert.js";
import { updateUI } from "./updateNavUI.js";
const logoutBtn = document.querySelector(".logoutBtn");

logoutBtn.addEventListener("click", function () {
  console.log("ok");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  updateUI();
  successAlert("Logout Successfully", 3);
});
