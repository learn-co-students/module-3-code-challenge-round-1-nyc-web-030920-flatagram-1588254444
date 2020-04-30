window.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/image')
    .then(response => response.json())
    .then(data => {
            // console.log(data)
            imgcrd = document.querySelector('.image-card')
            // console.log(imgcrd)
            commentSec = imgcrd.querySelector('.comments')
            comments = data.comments
            allcom = comments.forEach((e) => {
               console.log(e)
                li = document.createElement('li')
                li.description = e.content
                commentSec.appendChild(li)
                return li
            })
            imgcrd.innerHTML = 
            `<h2 class="title">${data.title}</h2>
            <img src="${data.image}" class="image" />
            <div class="likes-section">
              <span class="likes">${data.likes} likes</span>
              <button class="like-button">♥</button>
            </div>
            <ul class="comments">
            ${comments}
            </ul>
            <form class="comment-form">
              <input
                class="comment-input"
                type="text"
                name="comment"
                placeholder="Add a comment..."
              />
              <button class="comment-button" type="submit">Post</button>
            </form>`
    })
})
