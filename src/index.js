// write your code here
const baseURL = "http://localhost:3000/image"
document.addEventListener('DOMContentLoaded', (event) => {
    fetchInfo();
    listenToLikeButton();
    listenToCommentButton();
});

function fetchInfo(){
    fetch(baseURL)
    .then(resp => resp.json())
    .then(toys => renderInfo(toys))
}

function renderInfo(info){
    const image = document.getElementsByClassName("image")[0]
    const title = document.getElementsByTagName("h2")[0]
    let commentSection = document.getElementsByClassName("comments")[0]
    title.textContent = info.title
    image.src = info.image
    while (commentSection.hasChildNodes()) {  
        commentSection.removeChild(commentSection.firstChild);
      }
    info.comments.forEach(comment => {
        let text = document.createElement("li")
        text.textContent = comment.content
        commentSection.append(text)
    })
    const likes = document.getElementsByClassName("likes")[0]
    likes.textContent = `${info.likes} likes`

}

function listenToLikeButton(){
    const button = document.getElementsByTagName("button")[0]
    button.addEventListener("click", (event) => {
        addLikes();
    });
}

function addLikes(){
    const likes = document.getElementsByClassName("likes")[0]
    let newLikes = parseInt(likes.textContent)
    newLikes += 1
    likes.textContent = `${newLikes} likes`
    const patchObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      }
      fetch(baseURL, patchObj)
}

function listenToCommentButton(){
    const button = document.getElementsByClassName("comment-button")[0]
    button.addEventListener("click", (event) => {
        event.preventDefault();
        addComment();
    });
}

function addComment() {
    let getComment = document.getElementsByClassName("comment-input")[0];
    const commentSection = document.getElementsByClassName("comments")[0];
    const commentForm = document.getElementsByClassName("comment-form")[0];
    let li = document.createElement("li")
    li.textContent = getComment.value
    commentSection.append(li)
    commentForm.reset()
    console.log(getComment)
}
