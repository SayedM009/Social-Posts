import { closeModal } from "./closeModal.js";
import { dangerAlert } from "./dangerAlert.js";
import { getAllPost } from "./getAllPosts.js";
import { successAlert } from "./successAlert.js";

let editPostBtn;
let postTitle;
let postBody;
let postId;
let postImage;

function applyEventOnEditButtons() {
  const editButtons = document.querySelectorAll(".edit__post--btn");
  // 1. Apply click event on each edit button
  editButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      const { body, title, id } = JSON.parse(
        decodeURIComponent(e.target.closest(".card").dataset.post)
      );

      // 2. Open the eidt's modal
      const editModal = new bootstrap.Modal(
        document.querySelector("#editPost")
      );
      editModal.toggle();

      postId = id;
      document.querySelector("#editPostLable").textContent = "Edit Post";
      postTitle = document.querySelector(".post__title--edit");
      postBody = document.querySelector(".post__body--edit");
      postImage = document.querySelector(".post__image--edit");
      editPostBtn = document.getElementById("post__btn--edit");
      postTitle.value = title;
      postBody.value = body;

      editPostWithNewData();
    });
  });
}

function editPostWithNewData() {
  editPostBtn.addEventListener("click", async function () {
    try {
      const formData = new FormData();
      formData.append("title", postTitle.value);
      formData.append("body", postBody.value);
      formData.append("image", postImage.files[0]);
      formData.append("_method", "PUT"); // تحديد الطريقة الفعلية

      const res = await fetch(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      // 1. Close eidt's modal
      closeModal(document.querySelector("#editPost"));
      getAllPost();
      // 2. Success message
      successAlert("Your post has been updated", 2);
    } catch (error) {
      dangerAlert(error.message);
    }
  });
}

export { applyEventOnEditButtons };
