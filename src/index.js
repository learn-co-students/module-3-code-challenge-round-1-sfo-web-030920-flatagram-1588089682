// write your code here
const url = "http://localhost:3000/image";
function getPost() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderData(data);
    });
}

getPost();

function renderData(post) {
  const { title, likes, comments, image } = post;
  // Selectors
  const titleHeader = document.querySelector(".title");
  const likesHeader = document.querySelector(".likes");
  let imgHeader = document.querySelector(".image");

  //Elements
  titleHeader.textContent = title;
  likesHeader.textContent = `${likes} likes`;
  imgHeader.src = `${image}`;
  renderComments(comments);
}

function renderComments(arr) {
  let commentsHeader = document.querySelector(".comments");
  arr.forEach((comment) => {
    const commentItem = document.createElement("li");
    const hacheErre = document.createElement("hr");
    commentItem.textContent = comment.content;
    commentsHeader.appendChild(commentItem);
    commentItem.appendChild(hacheErre);
  });
}
const likeBtn = document.querySelector(".like-button");
likeBtn.addEventListener("click", updateLikes);
function updateLikes() {
  let likesValue = document.querySelector(".likes");
  likesValue = likesValue.textContent.split(" ")[0];

  let total = parseInt(likesValue) + 1;
  const comment = {
    likes: total,
  };
  const commentObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  };

  fetch(url, commentObj)
    .then((response) => response.json())
    .then((data) => {
      const likesHeader = document.querySelector(".likes");
      likesHeader.textContent = `${data.likes} likes`;
    });
}

function addButton() {
  const commentForm = document.querySelector(".comment-form");

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = document.querySelector(".comment-input");
    let commentsHeader = document.querySelector(".comments");
    const hacheErre = document.createElement("hr");
    const liItem = document.createElement("li");

    if (inputText.value === "") return;
    liItem.textContent = inputText.value;
    commentsHeader.append(liItem);
    liItem.append(hacheErre);
    createComment(inputText.value);
    commentForm.reset();
  });
}

addButton();

// function createComment(comment) {
//   console.log(comment);

//   const commentContent = {
//     content: comment,
//   };

//   const commentObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment),
//   }
//   fetch(url, commentObj)
//     .then((response) => response.json())
//     .then((data) => {
//       const likesHeader = document.querySelector(".likes");
//       likesHeader.textContent = `${data.likes} likes`;
//       console.log(data);
//     });
// }
