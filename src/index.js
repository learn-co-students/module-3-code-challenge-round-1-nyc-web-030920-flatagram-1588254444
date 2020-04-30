//fetch image, likes, and comments 
    //comments are an array
//event listener on heart icon
//likes increase when heart is clicked
//user can add a comment and it displays on the DOM

document.addEventListener('DOMContentLoaded', () => {
    fetchImage()  
})


const fetchImage = () => {
    fetch('http://localhost:3000/image')
    .then(response => response.json())
    .then(data => displayImage(data))
};

const displayImage = (data) => {
    const title = document.querySelector('.title')
    title.textContent = data.title
    const imageTag = document.querySelector('.image')
    imageTag.src = data.image
    const likesSpan = document.querySelector('.likes')
    likesSpan.textContent = `${data.likes} Likes`

    data.comments.forEach(comment => showComments(comment))
};

const showComments = (comment) => {

    const commentContainer = document.querySelector('.comments')
    let li = document.createElement('li') 
    li.textContent = comment.content
    commentContainer.append(li)
}; 







// const displayImage = (data) => {
//     const imageContainer = document.querySelector('.image-container')
//     const commentUl = document.createElement('ul')
//     console.log(commentUl)
//     commentUl.className = 'comments'
//     const imageDiv = document.createElement('div')
//     imageDiv.className = 'image-card'
//     imageDiv.innerHTML = `
//     <h2 class="title">${data.title}</h2>
//     <img src=${data.image} class="image" />
//     <div class="likes-section">
//       <span class="likes">${data.likes} likes</span>
//       <button class="like-button">♥</button>
//     </div>
//     `
//     imageContainer.append(imageDiv)
//     data.comments.forEach(comment => displayComments(comment, commentUl))
//     imageContainer.append(commentUl)
// };

// const displayComments = (comment, commentUl) => {
//     console.log(commentUl)
//     commentUl.innerHTML = `
//         <li>${comment.content}</li>
//     `
//     // const li = document.createElement('li')
//     // li.innerText = comment.content
//     // commentUl.append(li)
// };

