import { closeModal } from "./closeModal.js";
import { dangerAlert } from "./dangerAlert.js";
import { getAllPost } from "./getAllPosts.js";
import { successAlert } from "./successAlert.js";

const title = document.querySelector(".post__title");
const postBody = document.querySelector(".post__body");
const postImage = document.querySelector(".post__image");
const postBtn = document.getElementById("post__btn");
const createPostModal = document.querySelector("#createPost");

postBtn.addEventListener("click", async function (e) {
  try {
    if (!title.value && !postBody.value && !postImage.files[0]) return;
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("body", postBody.value);
    formData.append("image", postImage.files[0]);

    const response = await fetch("https://tarmeezacademy.com/api/v1/posts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // 1. Close login modal
    closeModal(createPostModal);
    // 2. Display success message
    successAlert("A new post has added", 3);
    // 3. Get all new posts
    getAllPost();
  } catch (error) {
    dangerAlert(error.message, 2);
    closeModal(createPostModal);
  }
});
