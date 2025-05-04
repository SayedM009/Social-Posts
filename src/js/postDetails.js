import "./register.js";
import "./logout.js";
import "./closeModal.js";
import "./login.js";
import { updateUI } from "./updateNavUI.js";
updateUI();

const postContainer = document.querySelector("#postDetailsContainer");
const postTitle = document.querySelector(".specific__post--title");
const url = new URLSearchParams(window.location.search);
const id = url.get("postId");
let commentValue;
let addCommentBtn;

export async function getPostDetails(id) {
  try {
    const response = await fetch(
      `https://tarmeezacademy.com/api/v1/posts/${id}`
    );
    const data = await response.json();
    const { data: post } = data;
    injectFetchedPost(post);
  } catch {
  } finally {
    // lastPost = [...postsContainer.children].at(-1);
    // watch();
  }
}

function injectFetchedPost(post) {
  let commentsContent = ``;
  post.comments.forEach((comment) => {
    commentsContent += `<li>
    <div class="d-flex gap-1 align-items-center ">
    <img
                class="rounded-circle"
                src="${checkImgExists(
                  comment.author.profile_image,
                  "src/imgs/user.png"
                )}"
                alt="User image"
                id="userImg"
              />
    <h6 class="m-0">${comment.author.username}</h6>
    </div>
    <p class="mt-2">${comment.body}</p>

    </li>`;
  });
  postTitle.textContent = post.author.name + " 's Post";
  postContainer.innerHTML = "";
  postContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="card col-12 my-3 shadow rounded-2 px-0" data-id="${
      post.id
    }" style="cursor:pointer">
            <div class="card-header d-flex gap-2">
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
              <ul class="list-unstyled mt-3 bg-info-subtle p-3">
              ${commentsContent}
              </ul>
            </div>
              <div class="row p-3">
                    <div class="col">
                        <input type="text" class="form-control post__comment" placeholder="Type your comment" aria-label="First name">
                    </div>
                    <div class="col-2">
                        <input type="submit" type="Add" class="btn btn-success add__comment" placeholder="Last name" aria-label="Last name">
                    </div>
                </div>
          </div>
          
          `
  );

  commentValue = document.querySelector(".post__comment");
  addCommentBtn = document.querySelector(".add__comment");
  addingComment();
}

function checkImgExists(url, localPath) {
  return Object.keys(url).length > 1 ? url : localPath;
}

getPostDetails(id);

function addingComment() {
  addCommentBtn.addEventListener("click", async function () {
    if (!commentValue.value || !localStorage.getItem("token")) return;
    const res = await fetch(
      `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          body: document.querySelector(".post__comment").value,
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    getPostDetails(id);
  });
}
