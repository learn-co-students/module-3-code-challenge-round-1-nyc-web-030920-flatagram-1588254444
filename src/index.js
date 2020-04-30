// write your code here
window.addEventListener("DOMContentLoaded", (e)=>{
getImageInformation()

const likeButton= document.getElementsByClassName("like-button")[0]
const likes= document.getElementsByClassName("likes")[0]
const commentForm= document.getElementsByClassName("comment-form")[0]
likeButton.addEventListener("click", function(e){
    addLike(likes)
})

commentForm.addEventListener("submit", function(e){addComment(e)})

})

function addLike(addTo){
    
    let likesString = addTo.innerText.split(" ")
    let likes= likesString[0]
    likes= parseInt(likes[0],10) +1
    likesString[0]= likes.toString()
    addTo.innerText= likesString.join(" ")
    fetch("http://localhost:3000/image/",{
        method:"PATCH",
        headers:{"Content-Type": "application/json", "Accept": "application/json"},
        body:JSON.stringify({"likes" : likesString[0]})
    }).then(rep=>rep.json()).then()
}

function getImageInformation(){
    const title= document.getElementsByClassName("title")[0]
    const image= document.getElementsByClassName("image")[0]
    const likes = document.getElementsByClassName("likes")[0]
    const comments= document.getElementsByClassName("comments")[0]
    fetch("http://localhost:3000/image").then(resp=>resp.json()).then(json=>{
        title.innerText= json.title
        
        title.dataset.id= json.id
        image.src = json.image
        likes.innerText = `${json.likes} likes`
        comments.innerText= createCommentString(json.comments)


    })
}

function createCommentString(array){
    let string=""
    for(const comment of array){
        
        string+= `${comment.content}\n`
    }
    return string
}

function addComment(e){
    
}
