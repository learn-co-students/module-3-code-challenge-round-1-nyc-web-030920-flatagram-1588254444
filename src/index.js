document.addEventListener('DOMContentLoaded',function(e){
getPic()


})
//=============================================================
function getPic(){
    fetch('http://localhost:3000/image')
    .then((resp)=>resp.json())
    .then((img)=>{
        pic(img)
    })
}
//==============================================================
function pic(img){
    let title = document.querySelector('.title')
    title.innerText = img.title
    let images = document.querySelector('.image')
    images.src= `${img.image}`
    let imgLikes = document.querySelector('.likes')
    imgLikes.innerText = `${img.likes} likes`
   imgComments(img)
}
//===================================================================
function imgComments(img){
    let comments = document.querySelector('.comments')
    comments.innerHTML=''
    img.comments.forEach(function(c){
        let li = document.createElement('li')
        li.innerText = c.content
        li.dataset.id = c.id
        //console.log(c.content)
        comments.appendChild(li)
    })
}
//========================================================================
(function addlike(){
    // let likeNum=document.getElementsByTagName("span")[0].innerHTML
    // let paresedLike = parseInt(likeNum.innerHTML, 10);
    let likeBtn = document.querySelector('.like-button')
    likeBtn.addEventListener('click', function(e){
        



        fetch('http://localhost:3000/image',{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({likes})
        })
        .then((resp)=>resp.json)
        .then(console.log(r))
    })


})()