////create DOMload Listener
////get the image, likes, and comments from server
////load the image, likes and comments to the page
////remove the placeholder comments
////add click listener to heart button
    ////increment the likes on the DOM
    ////patch the likes in the DB
////add a comment to the page (not the db)

window.addEventListener("DOMContentLoaded", (event) =>{
    console.log("The DOM is here")

    const baseUrl = "http://localhost:3000/image"
    const form = document.querySelector(".comment-form")
    const commentsList = document.querySelector(".comments")
    const likesDiv = document.querySelector(".likes-section")
    const likesSpan = document.querySelector(".likes")

    function getImage(){
        fetch(`${baseUrl}`)
            .then(response => response.json())
            .then(image => renderImage(image))
    }
    
    function renderImage(image){
        const img = document.querySelector(".image");
        const title = document.querySelector('.title');
        commentsList.innerHTML = "";
        image.comments.forEach(comment => renderComment(comment));
        img.src = image.image;
        title.textContent = image.title;
        likesSpan.dataset.likes = image.likes;
        likesSpan.textContent = `${image.likes} Likes`;
    }

    function renderComment(comment){
            const li = document.createElement("li");
            li.textContent = comment.content;
            commentsList.append(li);
    }

    likesDiv.addEventListener("click", (e) =>{
        if (e.target.className === "like-button"){
            likesSpan.dataset.likes++
            let num = likesSpan.dataset.likes
            likesSpan.textContent = `${num} Likes`
            fetch(`${baseUrl}`,{
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({likes: num})
                })
                .then(response => response.json())
                .then(json => console.log(json))
        }
    })

    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        const commentContent = document.querySelector(".comment-input")
        const newComment = {}
        newComment.id = 1
        newComment.content = commentContent.value
        renderComment(newComment)
        form.reset()
    })

    getImage()
//!END OF DOM LISTENER
})