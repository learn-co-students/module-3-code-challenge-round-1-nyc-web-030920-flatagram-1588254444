// write your code here

/*
oof, this is a real structural mishmash here
- lots of reliance on global scope
- mixing layers of data storage
- I'm not 100% on the consistency of the global imageData object with the DB
*/

const baseURL = "http://localhost:3000/image";
const headers = {
    "content-type": "application/json",
    "accept": "application/json"
};

let imageCard = null;
let commentList = null;

let imageData = null;

document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM loaded");

    imageCard = document.querySelector(".image-card");
    commentList = imageCard.querySelector(".comments");

    setupLikeListener();
    setupCommentListener();

    setupDownvoteListener();
    setupCommentDeleteListener();

    getImage();
});

//
//
function setupLikeListener(){
    document.addEventListener("click", event => {
        if(event.target.className.indexOf("like-button") !== -1){
            addLike(event.target);
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

//
//
function setupDownvoteListener(){
    document.addEventListener("click", event => {
        if(event.target.className.indexOf("downvote-button") !== -1){
            addDownvote(event.target);
        }
    })
}

//
//
function setupCommentDeleteListener(){
    document.addEventListener("click", event => {
        if(event.target.className.indexOf("delete") !== -1){
            deleteComment(event.target);
        }
    });
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
        // set this for the sake of the comments
        // it feels like there should be a separate resource/route for working with these
        // in a real-world setting
        imageData = data;
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

    renderLikes(data.likes);
    renderComments(data);
}

//
//
function renderLikes(likeCount){
    const likes = imageCard.querySelector(".likes");
    const plural = likeCount === 1 ? "" : "s";
    likes.innerText = `${likeCount} like${plural}`;

    likes.dataset.likes = likeCount;

    /*
    const likeButton = imageCard.querySelector(".like-button");
    likeButton.dataset.likes = likeCount;

    const downvoteButton = imageCard.querySelector(".downvote-button");
    downvoteButton.dataset.likes = likeCount;
    */
}

//
//
function renderComments(data){
    commentList.innerHTML = "";

    data.comments.forEach(comment => {
        renderIndividualComment(comment);
    });
}

//
//
function renderIndividualComment(comment){
    const li = document.createElement("li");
    li.dataset.content = comment.content;
    li.innerHTML = `
        ${comment.content} <button class="delete">X</button>
    `;
    commentList.append(li);
}

//////////////////////////////
// LIKES
//////////////////////////////

//
//
function addLike(button){
    updateLikes(1, button);
}

//
//
function addDownvote(button){
    updateLikes(-1, button);
}

//
//
function updateLikes(amount, button){
    const likeElement = button.parentNode.querySelector(".likes");
    const newLikes = parseInt(likeElement.dataset.likes) + amount;
    setLikes(newLikes);
}

//
//
function setLikes(newLikes){
    const likeBody = {
        likes: newLikes
    };

    fetch(baseURL, {
        method: "PATCH",
        headers,
        body: JSON.stringify(likeBody)
    })
    .then(res => res.json())
    .then(data => {
        // update the display
        imageData = data;
        renderLikes(newLikes);
    })
    .catch(err => console.log("error", err));
}

//////////////////////////////
// COMMENTS
//////////////////////////////

/*
INITIAL VALUES, just in case I need them

"comments": [
    {
        "id": 1,
        "content": "What a cute dog!"
    },
    {
        "id": 2,
        "content": "He has a nose for this!"
    },
    {
        "id": 3,
        "content": "Woof!"
    }
]
*/

//
//
function submitComment(form){

    if(form.comment.value){

        // am I supposed to come up with a new ID for this?
        // remaining consistent under deletion is not something I'm
        // going to deal with right now

        const newComment = {
            content: form.comment.value
        };

        // grab this from the image object
        const commentBody = {
            comments: [...imageData.comments, newComment]
        };

        updateComments(commentBody, form);
    }
}

//
//
function deleteComment(button){
    const content = button.parentNode.dataset.content;

    // I would normally want to do this based on matching ID
    // but if those aren't auto-generated, then I'm not going to mess with it

    const newComments = imageData.comments.filter(comment => {
        return comment.content !== content;
    });

    const commentBody = {
        comments: newComments
    };

    updateComments(commentBody);
}

//
//
function updateComments(commentBody, form = null){

    fetch(baseURL, {
        method: "PATCH",
        headers,
        body: JSON.stringify(commentBody)
    })
    .then(res => res.json())
    .then(data => {
        // imageData = data;
        if (form){
            form.reset();
        }
        getImage();
    })
    .catch(err => console.log("error", err));

    /*
    instead I'm going to just reload after persisting

    form.reset();

    renderIndividualComment(newComment);
    */
}