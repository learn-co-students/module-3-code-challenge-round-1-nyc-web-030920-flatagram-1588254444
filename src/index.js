// write your code here
window.addEventListener("DOMContentLoaded", (e)=>{
getImageInformation()
const likeButton= document.getElementsByClassName("like-button")[0]
const likes= document.getElementsByClassName("likes")[0]
const commentForm= document.getElementsByClassName("comment-form")[0]
const imageDiv= document.getElementsByClassName("image-container")[0]
likeButton.addEventListener("click", function(e){
    addLike(likes)
})

commentForm.addEventListener("submit", function(e){addComment(e)})

imageDiv.addEventListener("click", function(e){deleteComment(e)})
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
        comments.innerHTML=""
        for(const comment of json.comments){
            let li= document.createElement("li")
            li.innerText=comment.content
            li.className= "comment"
            let button= document.createElement("button")
            button.innerText="delete"
            button.className="delete"
            li.appendChild(button)
            comments.appendChild(li)
        }

    })
}


   

  

function addComment(e){
    e.preventDefault()
    const comments= document.getElementsByClassName("comments")[0]
    let li= document.createElement("li")
    let button= document.createElement("button")
    button.innerText="delete"
    button.className="delete"
    li.innerText=e.target[0].value
    li.appendChild(button)
    li.className= "comment"
    comments.appendChild(li)
}

function deleteComment(e){
//get comment array and splice from 0-id-1 then id-1 to end
//arr1 =splice(0..id-1)
//arr2= splice(id-1..arr.length-1)
//comments : arr1.concat(arr2)
    if(e.target.className ==="delete"){
       console.dir(e.target)
    }

}

/*  funky syntax error that I can't find
function addComment(e){
    e.preventDefault()
    fetch("http://localhost:3000/image").then(resp=>resp.json()).then(json=>{
        fetch("http://localhost:3000/image",{
            method:"PATCH",
            headers:{"Content-Type": "application/json", "Accept": "application/json"},
        body:JSON.stringify({"likes" : createCommentArr(json, e.target[0].value)})
        .then(resp=>resp.json())
        .then(console.log(json))
    })
 

}
}

function createCommentArr(json, text){
    let obj= json.comments
    let newID= parseInt(obj[obj.length-1].id)+1
    obj.push({"id":newID.toString, "content":text})
    return obj
}
*/
