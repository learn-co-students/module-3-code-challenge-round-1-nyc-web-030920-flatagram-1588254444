// click on heart icon to increase likes - persists
// add a comment - no persist

const flatagramUrl = 'http://localhost:3000/image'
const newHeaders = {
    "Content-type": "application/json"
}

const comments = document.querySelector('.comments')
const likes = document.querySelector('.likes')
const image = document.querySelector('.image')
const commentForm = document.querySelector('.comment-form')

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('hi buddy :)')
    const likeBtn = document.querySelector('.like-button')

    eraseComments()
    loadImage()
    
    likeBtn.addEventListener('click', function(event) {

        let likesNum = parseInt(likes.innerText) + 1
        likes.innerText = likesNum

        let likesObj = {likes: likesNum}
        updateLikeCount(likesObj)

    })

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault()
        // let comment = {}
        let comment = {"comments": { commentForm.comment.value } }

        console.log(comment)
    })


})

function eraseComments () {
    comments.innerHTML = ''
}

function loadImage() {
    fetch(flatagramUrl)
        .then(response => response.json())
        .then(load => {
            image.src = load.image
            likes.innerText = load.likes
 
            load.comments.forEach(comment => {
                let li = document.createElement('li')
                li.innerText = comment.content
                comments.appendChild(li)
            })
        })
}

function updateLikeCount(likes) {
    fetch(flatagramUrl, {
        method: 'PATCH',
        body: JSON.stringify(likes),
        headers: newHeaders
    })
        .then(response => response.json())
        .then(console.log)
}

function addComment(comment) {
    fetch(flatagramUrl, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: newHeaders
    })
        .then(response => response.json())
        .then(console.log)
}
