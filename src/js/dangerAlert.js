const damgerAlert = document.querySelector(".alert-danger");
function dangerAlert(message, seconds) {
  damgerAlert.classList.remove("visually-hidden");
  damgerAlert.textContent = message;
  setTimeout(() => {
    damgerAlert.classList.add("visually-hidden");
  }, seconds * 1000);
}

export { dangerAlert };
