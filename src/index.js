// write your code here

document.addEventListener("DOMContentLoaded", function(event){
 const requestHeader = { "Content-Type": "application/json", "Accept":"application/json"}   
 const imageCard = document.getElementsByClassName("image-card")[0]
 likeButton()
 fetch("http://localhost:3000/image")
 .then((resp) => resp.json())
 .then((data) => {
     console.log(data)
         let inner = imageCard.childNodes
         inner[1].textContent = data.title
         inner[3].src = data.image
        comments()
        })



        function likeButton(){
            amountLikes = 0
         const likeSection = document.getElementsByClassName("like-button")[0]
        likeSection.addEventListener("click", function(event){
            event.preventDefault()
            let likeCount = document.getElementsByClassName("likes")[0]
            likeCount.textContent = `${amountLikes} likes` 
            amountLikes ++;
            fetch("http://localhost:3000/image")
            .then((resp) => resp.json())
            .then(data => {
                amountLikes = data.likes;
            })
            fetch("http://localhost:3000/image", {
                method:"PATCH",
                headers: requestHeader,
                body: JSON.stringify({likes: amountLikes})
            })
            .then((resp) => resp.json())
        })
     }

   function comments(){
    let showComment = document.querySelector(`.comments`)
    fetch("http://localhost:3000/image")
    .then((resp) => resp.json())
    .then((picture) => {
        picture.comments.forEach(function(comment){
            let p = document.createElement("p")
            p.innerHTML = `${comment.content}` 
            showComment.appendChild(p)
        })
    })
   }
function dogComment(){
    let dogForm = document.getElementsByClassName("comment-form")
    dogForm.addEventListener('submit', function(event){
    event.preventDefault()
    const form = event.target 
    const comment = form.comment.value 
    const newComment = {comment}

    fetch("http://localhost:3000/image",{
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(newComment)
    })
    .then((resp) => resp.json())
    .then((comment) => {
  addComment(comment)
    })
})
}
   
function addComment(comment){
    let p = document.createElement("p")
            p.innerHTML = `${comment.content}` 
            showComment.appendChild(p)
}
})
