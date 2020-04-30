// write your code here

// get images / likes / comments onto the dom - some post request for new ones
// image already there
// just persist likes into db 

// like button  add listener to heart 
// listener on post button
// patch likes to database 
// advanced ////
// persist comments too 
// downvote an image
// delete a comment 

// ^^ See the image received from the server, including its likes and comments when the page loads
// ^^ Click on the heart icon to increase image likes, and still see them when I reload the page
// ^^ Add a comment (no persistence needed)


document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const url = 'http://localhost:3000/image'

  const getImages = () => {
    fetch(url)
    .then(r => r.json())
    .then(renderImageObj)
  }

  const renderImageObj = imageObject => {

    const title = document.querySelector('.title')
    title.textContent = imageObject.title

    const likes = document.querySelector('.likes')
    likes.textContent = `${imageObject.likes} likes` //likes text removed for now

    const img = document.querySelector('.image')
    img.src = imageObject.image 

    imageObject.comments.forEach(comment => {
      const ul = document.querySelector('ul')
      const li = document.createElement('li')

      li.innerHTML =  `
        ${comment.content}
      `
      ul.append(li)
      });
      
  }

  // listener on comment submit button
  const commentForm = document.querySelector('.comment-form')

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let commentInput = document.querySelector('.comment-input')
  
    let userComment = commentInput.value
    console.log('clicked post', userComment)

    const ul = document.querySelector('ul')
    const li = document.createElement('li')

    li.innerHTML = `
    ${userComment}
    `
    ul.append(li)
    commentForm.reset()
    
  })

  // listener on like
  const heartbtn = document.querySelector('.like-button')
  console.log(heartbtn)

  heartbtn.addEventListener(`click`, (e) => {

    console.log("clicked")
    
    incrementLikes(1)
    const likeCounter = document.querySelector('.likes')

    ///  persist likes to db
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCounter.textContent
      })
    })
    .then(r => r.json())

  })
  
  getImages()
});

// helper function for likes
function incrementLikes (n) {
  const likeCounter = document.querySelector('.likes')
  let currentLikes = parseInt(likeCounter.textContent)
  let newTotal = currentLikes + n
  likeCounter.textContent = `${parseInt(newTotal)} likes`
}