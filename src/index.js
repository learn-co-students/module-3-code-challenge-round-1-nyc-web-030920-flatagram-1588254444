
// √ fetch image info from local host
// √ set image container info = to ^
// √ find the heart + likes "likes-section"
// √ event listener on the heart 
// patch likes +=1 to DB
// event listener on the post
// patch post to DB  

const baseURL = "http://localhost:3000/image"

document.addEventListener('DOMContentLoaded', (event) => { //dont think we need thiss bc of script defer but to be safe

const imgCard = document.querySelector(".image-card")

// const imgLink = imgCont.querySelector 

fetch(baseURL)
  .then(response => response.json())
  .then(post => {
      imgCard.dataset.likes = post.likes
      imgCard.innerHTML = `
        <h2 class="title">${post.title}</h2>
        <img src="${post.image}" class="image" />
        <div class="likes-section">
          <span class="likes">`${post.likes} likes`</span>
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
      let comments = post.comments
        comments.forEach(comment => {
            addComment(comment)
        }) //end of forEach comment
    
  }); // end of Fetch image data

  document.addEventListener("click", function(e){
      e.preventDefault();
    
      if (e.target.className === "like-button"){
          let likeSection = e.target.parentNode
          let likes = parseInt(likeSection.querySelector("span").textContent)
          newLikes = likes +=1
          

        fetch(baseURL, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: newLikes})
          })
          .then(resp => {
              console.log(resp)
          })
          


      } // end of if click is like button



  }) // end of event listener




  // Functionz-----------------------------

  function addComment(comment) {
      let ul = document.querySelector(".comments")
      let li = document.createElement("li")
      li.dataset.id = comment.id
      li.textContent = `- ${comment.content}`
      ul.append(li)
  }


}) // End of DOM Content Loaded 
