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
/* there is no time to redo my mistake so i will sudo code it. 
I should have just used elementfindbyId or queryselector to get the elements 
than change the values individually after i would have found the the comments
section via queryselector('.comments') used for Each to get them displayed. 

Adding a comment.
add an event listner on the comments the event would have been submit.
create li
make li.description equal to the data.content
find comment sect
than appendchild the li

like button 
find button 
add event listner for click action
in listner
like number = parseInt(like number) += 1


 */ 