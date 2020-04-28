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
  console.log(image);
  console.log(imgHeader);
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

// function createComment() {
//   const commentForm = document.querySelector(".comment-form");
//   commentForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const inputText = document.querySelector(".comment-input");
//     const comment = {
//       content: inputText.value,
//     };
//     const commentObj = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(comment),
//     };

//     fetch(url, commentObj)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   });
// }
// createComment();

function addButton() {
  const commentForm = document.querySelector(".comment-form");
  commentForm.addEventListener("click", (e) => {
    e.preventDefault();

    const inputText = document.querySelector(".comment-input");
    let commentsHeader = document.querySelector(".comments");
    const hacheErre = document.createElement("hr");
    const liItem = document.createElement("li");
    if (inputText.value === "") return;
    liItem.textContent = inputText.value;
    commentsHeader.append(liItem);
    liItem.append(hacheErre);
    commentForm.reset();
  });
}

addButton();
