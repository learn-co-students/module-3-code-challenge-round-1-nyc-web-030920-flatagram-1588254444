// write your code here

document.addEventListener('DOMContentLoaded', () =>
{
    const form = document.querySelector('.comment-form')
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
        currentImg = event.target.parentNode.parentNode
        console.log(currentImg)
        likesSection = event.target.parentNode
        const currentLikes = likesSection.querySelector('.likes').innerText[0]
        const newLikes = parseInt(currentLikes) + 1 //couldnt get this to work 
       
        let id = currentImg.dataset.id

        fetch(`http://localhost:3000/image/${id}`,{
            method: 'PATCH',
            headers: {'accept':'application/json',
        'content-type':'application/json'},
        body: JSON.stringify({'likes': newLikes})
        })
        .then(response => response.json())
        .then(data => {
            currentLikes[0].innerText = newLikes
        })
        
    }
})

form.addEventListener('submit',function(event){
    commentForm = event.target.parentNode.parentNode
    comment = event.target.comments.value 
    console.log(comment)
    

})




















})
