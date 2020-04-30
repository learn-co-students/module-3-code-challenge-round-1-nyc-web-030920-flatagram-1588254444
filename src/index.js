////create DOMload Listener
////get the image, likes, and comments from server
////load the image, likes and comments to the page
////remove the placeholder comments
////add click listener to heart button
    //increment the likes on the DOM
    //patch the likes in the DB
//add a comment to the page (not the db)

window.addEventListener("DOMContentLoaded", (event) =>{
    console.log("The DOM is here")

    const baseUrl = "http://localhost:3000/image"

    function getImage(){
        fetch(`${baseUrl}`)
            .then(response => response.json())
            .then(image => renderImage(image))
    }
    
    const commentsList = document.querySelector(".comments")
    const likesDiv = document.querySelector(".likes-section")
    const likesSpan = document.querySelector(".likes")
    
    function renderImage(image){
        console.log(image)
        const img = document.querySelector(".image")
        const title = document.querySelector('.title')
        commentsList.innerHTML = ""
        renderComments(image.comments)
        img.src = image.image
        title.textContent = image.title
        likesSpan.dataset.likes = image.likes
        likesSpan.textContent = `${image.likes} Likes`
    }

    function renderComments(commentsArray){
        commentsArray.forEach(comment => {
            const li = document.createElement("li")
            li.textContent = comment.content
            commentsList.append(li)
        });
    }

    likesDiv.addEventListener("click", (e) =>{
        if (e.target.className === "like-button"){
            console.log(likesSpan)
            console.log(likesSpan.textContent)
            console.log("I'm the like button!!")
        }
    })



    getImage()
//!END OF DOM LISTENER
})