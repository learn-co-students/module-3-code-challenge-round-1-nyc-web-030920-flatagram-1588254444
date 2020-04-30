// write your code here


//1. fetch info from api, append it to <div class="image-card">
//2. like button works and PATCH database with increased like number
//3. can comment to a post/ not persistence
const baseUrl = 'http://localhost:3000/image';
const dogCard = document.querySelector('.image-card');
document.addEventListener('DOMContentLoaded', function(){
    
    function fetchDogInfo() {
        fetch(baseUrl)
        .then(res => res.json())
        .then(function(result){
            showDog(result);
        })
    }

    function showDog(result){
        dogCard.innerHTML = ``;
        dogCard.innerHTML = `
        <h2 class="title">${result['title']}</h2>
        <img src=${result['image']} class="image" />
        <div class="likes-section">
          <span class="likes">${result['likes']} likes</span>
          <button class="like-button">♥</button>
        </div>
        <ul class="comments">
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
        `
        let ul = document.querySelector('.comments');
        const comments = result['comments'];
        comments.forEach(function(comment){
            let li = document.createElement('li')
            li.textContent = comment['content'];
            ul.append(li);
        })
        console.log(comments);
    }

    dogCard.addEventListener('click', function(event){
        let eventTarget = event.target;
        console.log()
    })


    fetchDogInfo()
})