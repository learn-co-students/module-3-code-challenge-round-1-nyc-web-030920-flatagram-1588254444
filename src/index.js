// write your code here

const baseURL = "http://localhost:3000/image";
const headers = {
    "content-type": "application/json",
    "accept": "application/json"
};

let imageCard = null;
let commentList = null;

document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM loaded");

    imageCard = document.querySelector(".image-card");
    commentList = imageCard.querySelector(".comments");

    setupLikeListener();
    setupCommentListener();

    getImage();
});

//
//
function setupLikeListener(){
    document.addEventListener("click", event => {
        if(event.target.className.indexOf("like-button") !== -1){
            addLike();
        }
    })
}

//
//
function setupCommentListener(){
    document.addEventListener("submit", event => {
        event.preventDefault();
        if(event.target.className.indexOf("comment-form") !== -1){
            submitComment(event.target);
        }
    })
}

//////////////////////////////
// DISPLAY
//////////////////////////////

//
//
function getImage(){
    fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        renderImageData(data);
    })
    .catch(err => console.log("error", err));
}

//
//
function renderImageData(data){
    const title = imageCard.querySelector(".title");
    title.innerText = data.title;

    const img = imageCard.querySelector("img");
    img.src = data.image;

    const likes = imageCard.querySelector(".likes");
    const plural = data.likes === 1 ? "" : "s";
    likes.innerText = `${data.likes} like${plural}`;

    renderComments(data);
}

function renderComments(data){
    commentList.innerHTML = "";

    data.comments.forEach(comment => {
        renderIndividualComment(comment);
    });
}

//////////////////////////////
// LIKES
//////////////////////////////

function addLike(){
    
}

//////////////////////////////
// COMMENTS
//////////////////////////////

function submitComment(form){

    if(form.comment.value){
        const newComment = {
            content: form.comment.value
        };
    
        form.reset();
    
        renderIndividualComment(newComment);
    }
}

function renderIndividualComment(comment){
    const li = document.createElement("li");
    li.innerText = comment.content;
    commentList.append(li);
}