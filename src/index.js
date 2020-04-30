// write your code here


//√1. fetch info from api, append it to <div class="image-card">
//√2. like button works and PATCH database with increased like number
//√3. can comment to a post/ not persistence
//√4. Still see the comments written after reloading the page
//5. Downvote an image
//6. Delete a comment
const baseUrl = 'http://localhost:3000/image';
const dogCard = document.querySelector('.image-card');
let dogObj = {};
let form = document.querySelector('form');
document.addEventListener('DOMContentLoaded', function(){
    
    function fetchDogInfo() {
        fetch(baseUrl)
        .then(res => res.json())
        .then(function(result){
            dogObj = result;
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
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.setAttribute('class', 'delete-comment');
            li.append(deleteButton);
            ul.append(li);
        })
    }

    dogCard.addEventListener('click', function(event){
        let eventTarget = event.target;
        if (eventTarget.className === 'like-button') {
            dogObj['likes']++;
            fetch(baseUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify(dogObj)
            })
            .then(res => res.json())
            .then(fetchDogInfo);
        } else if (eventTarget.className === 'comment-button') {
            event.preventDefault();
            let comment = eventTarget.parentElement.comment.value;

            //non persistence comment code, line 78 - 82
            // let ul = document.querySelector('.comments');
            // let li = document.createElement('li');
            // li.textContent = comment;
            // ul.append(li);
            // eventTarget.parentElement.reset();
            
            //persistence comment code, line 85 - 97
            let id = dogObj['comments'].length + 1;
            let newComment = {'id': id, 'content': comment}
            dogObj['comments'].push(newComment);
            fetch(baseUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify(dogObj)
            })
            .then(res => res.json())
            .then(fetchDogInfo);
        }
    })

    fetchDogInfo()
})



