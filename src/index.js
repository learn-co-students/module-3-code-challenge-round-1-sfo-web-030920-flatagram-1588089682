// write your code here
fetchImage();
listenToHeartBtn();
addComment();

function fetchImage() {
  fetch("http://localhost:3000/image")
    .then((resp) => resp.json())
    .then((image) => {
      console.log(image);
      renderTitle(image);
      renderImageInfo(image);
    });
}

function renderTitle(json) {
  const titleHeader = document.querySelector(".title");
  titleHeader.innerText = json.title;
}

function renderImageInfo(json) {
  const image = document.querySelector(".image");
  const likesSpan = document.querySelector(".likes");
  const commentsUl = document.querySelector(".comments");
  commentsUl.innerHTML = "";

  image.src = json.image;
  likesSpan.innerText = `${json.likes} likes`;

  json.comments.forEach((comment) => {
    const commmentLi = document.createElement("li");
    commmentLi.innerText = comment.content;
    commentsUl.append(commmentLi);
  });
}

function listenToHeartBtn() {
  const heartBtn = document.querySelector(".like-button");

  heartBtn.addEventListener("click", function () {
    const likesSpan = document.querySelector(".likes");
    const numLikes = parseInt(likesSpan.innerText.split(" ")[0]);
    const newLikes = numLikes + 1;
    const patchObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    };

    fetch("http://localhost:3000/image", patchObj);
    likesSpan.innerText = `${newLikes} likes`;
  });
}

function addComment() {
  const form = document.querySelector(".comment-form");
  const input = document.querySelector(".comment-input");
  const commentsUl = document.querySelector(".comments");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const commentLi = document.createElement("li");
    commentLi.innerText = input.value;
    commentsUl.append(commentLi);
    input.value = "";
  });
}
