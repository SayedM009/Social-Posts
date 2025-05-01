const successLoginAlert = document.querySelector(".login-success-alert");
function successAlert(message, seconds) {
  successLoginAlert.classList.remove("visually-hidden");
  successLoginAlert.textContent = message;
  setTimeout(() => {
    successLoginAlert.classList.add("visually-hidden");
  }, seconds * 1000);
}

export { successAlert };
