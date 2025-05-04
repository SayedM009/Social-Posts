function updateUI() {
  const loginBtn = document.querySelector(".loginBtn");
  const registerBtn = document.querySelector(".registerBtn");
  const logoutBtn = document.querySelector(".logoutBtn");
  const createPostBtn = document.querySelector(".createPostBtn");
  const userAvatar = document.querySelector("#userAvatar");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    loginBtn.classList.add("d-none");
    registerBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
    if (createPostBtn) createPostBtn.classList.remove("d-none");
    userAvatar.classList.remove("d-none");
  }

  if (!token || !user) {
    loginBtn.classList.remove("d-none");
    registerBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
    if (createPostBtn) createPostBtn.classList.add("d-none");
    userAvatar.classList.add("d-none");
  }
}

export { updateUI };
