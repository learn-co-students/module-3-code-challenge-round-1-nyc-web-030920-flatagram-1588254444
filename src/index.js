DOMImplementation

let likes = document.querySelector('like-button').addEventListener("click");

fetch('http://localhost:3000/image')
    .then (response => response.json())
    .then (likes => console.log(likes));
 



 document.createElement('li')
document.getElementsByClassName('comments').appendChild('ul li')


