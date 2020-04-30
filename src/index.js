// write your code here

document.addEventListener('DOMContentLoaded', () =>
{

fetch('http://localhost:3000/image')
.then(response => response.json())
.then(image => {
    
        createImage(image)
    
})

function createImage(image){
    console.log(image)
    const imgContainer = document.querySelector('.image-container')
    const newCard = document.createElement('div')
    newCard.className = 'image-card'
    newCard.innerHTML = 

    `<h2 class="title">${image.title}</h2>
    <img src= ${image.image} class="image" />
    <div class="likes-section">
      <span class="likes">${image.likes} likes</span>
      <button class="like-button">♥</button>
    </div>
    <ul class="comments">
      <li>${image.comments}</li>
      <li>And replace them with the real ones</li>
      <li>From the server</li>
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

    newCard.dataset.id = image.id 

    imgContainer.append(newCard)


}






















})
