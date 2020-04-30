// write your code here

document.addEventListener("DOMContentLoaded", function(event){
 const requestHeader = { "Content-Type": "application/json", "Accept":"application/json"}   
 const imageCard = document.getElementsByClassName("image-card")[0]
 fetch("http://localhost:3000/image")
 .then((resp) => resp.json())
 .then((data) => {
     console.log(data)
         let child = imageCard.childNodes
         child[1].textContent = data.title
         child[3].src = data.image
        comments()
        })
         function likeButton(){
         const likeSection = document.getElementsByClassName("like-button")[0]
         let likeCount = document.getElementsByClassName("likes")[0]
        likeSection.addEventListener("click", function(event){
            event.preventDefault()
            let newCount = parseInt(likeCount[0].innerHTML) + 1 
            likeCount[0].innerHTML = newCount 
            
            fetch("http://localhost:3000/image", {
                method:"PATCH",
                headers: requestHeader,
                body: JSON.stringify(`${newcount} likes`)
            })
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
})
