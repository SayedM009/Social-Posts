import { closeModal } from "./closeModal.js";
import { dangerAlert } from "./dangerAlert.js";
import { getAllPost } from "./getAllPosts.js";
import { successAlert } from "./successAlert.js";

let postId;
function deletePost() {
  const deleteBtn = document.querySelectorAll(".delete__post--btn");
  // 1. Apply click event on each edit button
  deleteBtn.forEach((button) => {
    button.addEventListener("click", async function (e) {
      const { body, title, id } = JSON.parse(
        decodeURIComponent(e.target.closest(".card").dataset.post)
      );

      postId = id;

      deleteModal;
      const editModal = new bootstrap.Modal(
        document.querySelector("#deleteModal")
      );
      editModal.toggle();
      //   // 2. Open the eidt's modal
      //   const editModal = new bootstrap.Modal(
      //     document.querySelector("#editPost")
      //   );
      //   editModal.toggle();

      //   postId = id;
      //   document.querySelector("#editPostLable").textContent = "Edit Post";
      //   postTitle = document.querySelector(".post__title--edit");
      //   postBody = document.querySelector(".post__body--edit");
      //   postImage = document.querySelector(".post__image--edit");
      //   editPostBtn = document.getElementById("post__btn--edit");
      //   postTitle.value = title;
      //   postBody.value = body;
    });
  });
}

document
  .querySelector(".modalDeleteBtn")
  ?.addEventListener("click", async function () {
    try {
      const res = await fetch(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      getAllPost();
      closeModal(document.querySelector("#deleteModal"));
      successAlert("Your post has been deleted successfully", 2);
    } catch (error) {
      dangerAlert(error.message);
    }
  });

export { deletePost };
