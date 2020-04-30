const url = "http://localhost:3000/image";
const comments = document.querySelector('.comments')
document.addEventListener("DOMContentLoaded", function(){
    receiveData()
})

function receiveData(){
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
        console.log(json)
        renderDogs(json);
    })
}


function renderDogs(data){
    // gets the class for the title
    const title = document.querySelector('.title');
    
    // gets the image of the dog and slaps it onto the DOM
    document.querySelector('.image').src = `${data.image}`;

    // gets the class for likes
    const likes = document.querySelector('.likes');

    comments.innerText = `
        ${data.comments[0].content},
        ${data.comments[1].content},
        ${data.comments[2].content}
    `
        

    // adds the title to the class
    title.innerText = data.title;

    // adds the likes to the class
    likes.textContent = `${data.likes} likes`;


    document.addEventListener("click", function(event){
        if(event.target.className === 'like-button'){
            likes.textContent = `${data.likes++} likes`
        }
    })
}

document.addEventListener("click", function(event){
    event.preventDefault()
    if(event.target.className === 'comment-button'){
        const commentInput = document.querySelector('.comment-input')
       comments.append(commentInput);
    }
})