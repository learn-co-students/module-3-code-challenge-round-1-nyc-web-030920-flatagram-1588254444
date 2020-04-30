// write your code here
const endpoint = 'http://localhost:3000/image'
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

let imgCardDiv;
let form;
let h2; 
let img;
let likesSpan;
let commentsUl;
let likesBtn;
let formBtn;

document.addEventListener('DOMContentLoaded', () => {

  imgCardDiv = document.querySelector('.image-card')
  form = document.querySelector('.comment-form')
  formBtn = document.querySelector('.comment-button')
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

  formBtn.addEventListener('click', event => {
    event.preventDefault()
    let commentInput = form.children[0]
    if (commentInput.value) {
      let newCommentLi = document.createElement('li')
      let lastLi = commentsUl.lastChild
  
      let idValue = lastLi.dataset.id
      
      newCommentLi.innerText = commentInput.value
      newCommentLi.dataset.id = ++idValue
      commentsUl.append(newCommentLi)

      form.reset()

      let comments = []
      commentsUl.childNodes.forEach(li => {
        
        if (li.nodeName === 'LI') {
          comments.push({id: li.dataset.id, content: li.innerText})
        }
      })

      fetch(endpoint, {
        method: 'PATCH', 
        headers,
        body: JSON.stringify({
          comments: comments
        })
      })
      .then(resp => resp.json())
      .then(console.log)

    }
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
    if (commentsUl.children.length < obj['comments'][i].id) {
      let li = document.createElement('li')
      li.dataset.id = obj['comments'][i].id
      li.innerText = obj['comments'][i].content
      commentsUl.append(li)
    } else {
      commentsUl.children[i].innerText = obj['comments'][i].content
      commentsUl.children[i].dataset.id = obj['comments'][i].id
    }
  }
}


// Downvote an image
// Delete a comment

