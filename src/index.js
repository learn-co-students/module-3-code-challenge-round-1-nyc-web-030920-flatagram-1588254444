// write your code here




const baseUrl = 'http://localhost:3000/image'
document.addEventListener('DOMContentLoaded',function(){

    fetchImage()

    getLikes()

})

function fetchImage(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(pic => postPicture(pic))
    // console.log(pic)
}

function postPicture(pic){
    let wallPic = document.querySelector('.image')
    // debugger
    let titlePic = document.querySelector('.title')
    // console.log(wallpic)
    wallPic.src = pic.image
    titlePic.innerText = pic.title
    // debugger
    // debugger
}

function getLikes(){
    


}


