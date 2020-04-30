////create DOMload Listener
////get the image, likes, and comments from server
//load the image, likes and comments to the page
//add click listener to heart button
//add likes to db
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

    function renderImage(image){
        console.log(image)
        const img = document.querySelector(".image")
        const title = document.querySelector('.title')
        const likes = document.querySelector(".likes")
        commentsList.innerHTML = ""
        renderComments(image.comments)
        img.src = image.image
        title.textContent = image.title
        likes.textContent = `${image.likes} Likes`
    }

    function renderComments(commentsArray){
        commentsArray.forEach(comment => {
            const li = document.createElement("li")
            li.textContent = comment.content
            commentsList.append(li)
        });
    }




    getImage()
//!END OF DOM LISTENER
})