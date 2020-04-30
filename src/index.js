// write your code here

// do the fecth and get the info about dog
// do like function 
// do post function 

document.addEventListener('DOMContentLoaded', (event) => {

    getImage()


    function  getImage(){ 
    fetch("http://localhost:3000/image")
    .then(r => r.json())
    // .then(image => increaseLike(image))
    }



let likeButton = document.getElementsByClassName("like-button")[0]

likeButton.addEventListener('click',increaseLike )

function increaseLike(event) {
   let span = document.getElementsByClassName('likes')[0]
   console.log( span.innerHTML = parseInt(span.innerHTML)+1 )

    
    

}




});