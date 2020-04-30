// write your code here
document.addEventListener("DOMContentLoaded",function(){
     let pup=document.getElementsByClassName("image")[0]
    let ul=document.getElementsByClassName("comments")[0]
    function getImages(){
        fetch("http://localhost:3000/image")
        .then((resp)=>resp.json())
        .then((pic)=>{
            loadImage(pic)
        })

    }
//================================
function loadImage(pic){
    h2Title.innerHTML=pic.title

    pup.src= pic.image
    ul.innerHTML=" "
    commentSection(pic)

}



//===============================
let likeNum=document.getElementsByTagName("span")[0]
let h2Title= document.getElementsByTagName("h2")[0]
function commentSection(pic){

    pic.comments.forEach(function(c){
        likeNum.innerHTML=pic.likes
        let li = document.createElement('li')
        li.innerText = c.content
       
        ul.appendChild(li)
    })
}

//===============================
let btn=document.getElementsByClassName("like-button")[0]
let likes=parseInt(likeNum.innerText,10)

function liked(){
    btn.addEventListener("click",function(event){

likes++
likeNum.innerText=`${likes} likes`
    fetch("http://localhost:3000/image",{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "accept":"application/json"
        },
        body:JSON.stringify({likes})
     })
     .then((resp)=>resp.json())
     .then((json)=>console.log(json))
   }) 





}
//======================================
// function addComents(){
// let

//     fetch("http://localhost:3000/image",{
//         method:"PATCH",
//         headers:{
//             "Content-Type":"application/json",
//             "accept":"application/json"
//         },
//         body:JSON.stringify({comments})
//      })
//      .then((resp)=>resp.json())
//      .then((json)=>console.log(json))
//    }) 



// }






// addComents()
liked()
getImages()
})// end dom