// write your code here

document.addEventListener('DOMContentLoaded', () =>
{
const imgContainer = document.querySelector('.image-container')

fetch('http://localhost:3000/image')
.then(response => response.json())
.then(image => {
    
        createImage(image)
    
})




function createImage(image){
   
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
      <li>${image.comments[0].content}</li>
      <li>${image.comments[1].content}</li>
      <li>${image.comments[2].content}</li>
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



imgContainer.addEventListener('click',function(event){
    
    if (event.target.className === 'like-button') {
        likesSection = event.target.parentNode
        likesSection.querySelector('.likes')
        const currentLikes = likesSection.querySelector('.likes')
        newLikes = `${parseInt(currentLikes.innerText[0]) + 1}`
        console.log(newLikes)
    }
})




















})
