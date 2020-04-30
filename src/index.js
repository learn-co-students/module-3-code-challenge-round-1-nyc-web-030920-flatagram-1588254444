// write your code here
const endpoint = 'http://localhost:3000/image'
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

document.addEventListener('DOMContentLoaded', () => {

  imgCardDiv = document.querySelector('.image-card')
  form = document.querySelector('.comment-form')
  h2 = document.querySelector('.title')
  img = document.querySelector('.image')
  likesSpan = document.querySelector('.likes')
  commentsUl = document.querySelector('.comments')
  likesBtn = document.querySelector('.like-button')

  getData()

  document.addEventListener('click', event => {

    if (event.target.className === 'like-button') {
      let likes = parseInt(likesSpan.innerText)
      ++likes
      likesSpan.innerText = `${likes} likes`

      fetch(endpoint, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({likes: likes})
      })
      .then(resp => resp.json())
      .then(console.log)
    }
  })

  form.addEventListener('submit', event => {
    event.preventDefault()

    


  })




})

function getData() {
  fetch(endpoint)
  .then(resp => resp.json())
  .then(renderData)
} 

function renderData(obj) {
  h2.innerText = obj.title
  img.src = obj.image
  likesSpan.innerText = `${obj.likes} likes`

  for(let i = 0; i < obj['comments'].length; i++) {
    commentsUl.children[i].innerText = obj['comments'][i].content
    commentsUl.children[i].dataset.id = obj['comments'][i].id
  }
}

// As a user, I can:


// Add a comment (no persistence needed)

// As a user, I can:

// Still see the comments written after reloading the page
// Downvote an image
// Delete a comment

let imgCardDiv;
let form;
let h2; 
let img;
let likesSpan;
let commentsUl;
let likesBtn;



// comments: Array(3)
// 0: {id: 1, content: "What a cute dog!"}
// 1: {id: 2, content: "He has a nose for this!"}
// 2: {id: 3, content: "Woof!"}
// length: 3
// __proto__: Array(0)
// image: "./assets/coder-dog.png"
// likes: 0
// title: "Coder dog"


