import { applyEventOnEditButtons } from "./editButtons.js";
import { deletePost } from "./deletePost.js";

const postsContainer = document.querySelector("#posts");

export async function getAllPost() {
  try {
    const response = await fetch(`https://tarmeezacademy.com/api/v1/posts`);
    const data = await response.json();
    const { data: posts } = data;
    injectFetchedPosts(posts);
  } catch {
  } finally {
  }
}

getAllPost();

function injectFetchedPosts(posts) {
  let id;
  let name;
  if (localStorage.getItem("token")) {
    id = JSON.parse(localStorage.getItem("user")).id;
    name = JSON.parse(localStorage.getItem("user")).name;
  }

  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    postsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="card col-9 my-3 shadow rounded-2 px-0" data-post="${encodeURIComponent(
        JSON.stringify(post)
      )}">
            <div class="card-header d-flex gap-2 align-items-center">
              <img
                class="rounded-circle"  
                src="${checkImgExists(
                  post.author.profile_image,
                  "src/imgs/user.png"
                )}"
                alt="User image"
                id="userImg"
              />
              <div class="info align-content-center">
                <h6 class="fw-b mb-0 mt-1" id="userName">${
                  post.author.username
                }</h6>
                <span id="postTime">${post.created_at}</span>
              </div>
              <div class="ms-auto ${
                post.author.id == id && post.author.username == name
                  ? "d-block"
                  : "d-none"
              }">
                <button class="btn btn-warning edit__post--btn">Edit</button>
                <button class="btn btn-danger delete__post--btn">Delete</button>
              </div>
            </div>
            <div class="card-body">
              <img class="w-100" src="${checkImgExists(
                post.image,
                "src/imgs/post-02.png"
              )}" alt="" />
              <h3 class="my-3">${post.title}</h3>
              <p class="card-text">
                ${post.body}
              </p>
              <hr />
              <div class="comments">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                  />
                </svg>
                <span>(${post.comments_count})</span>
                <span>Comments</span>
                
              </div>
            </div>
          </div>`
    );
  });
  applyEventOnEditButtons();
  deletePost();
}

function checkImgExists(url, localPath) {
  return Object.keys(url).length > 1 ? url : localPath;
}
