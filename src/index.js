
// PATCH /image

//Click on heart icon to increase image likes and see them when reloaded
// Add a comment 

const url = `http://localhost:3000/image`
const card = document.querySelector('.image-card')
document.addEventListener("DOMContentLoaded", event => {
    getUsers()
    likes()
})

function getUsers(){
    fetch(url)
    .then(resp => resp.json())
    .then(obj => renderUser(obj))
}

function renderUser(obj) {
    let title = obj.title
    let likes = obj.likes
    let imgUrl = obj.image

    let titleNode = card.querySelector('h2')
    titleNode.innerText = title

    let imageNode = card.querySelector('img')
    imageNode.src = imgUrl

    let likesNode = card.querySelector('span.likes')

    let heart = card.querySelector('button.like-button')

    let commentUl = card.querySelector('ul.comments')

    // console.log(commentUl)
    // console.log(likesNode)
    // console.log(heart)
    // console.log(titleNode)
    // console.log(imageNode)

    commentUl.innerHTML=''
    obj.comments.forEach(comment => {
        let id = comment.id
        let content = comment.content

        let li = document.createElement('li')
        li.dataset.id = id
        li.innerText = content
        commentUl.appendChild(li)
    })
}

function likes(){
    card.addEventListener('click', event =>{
        if(event.target.className === "like-button"){
            let parent = event.target.parentNode
            let likeNode = parent.querySelector('span')
            let likes = parseInt(likeNode.innerText)
            likes += 1
            likeNode.innerText = `${likes} Likes`
        }
    })
}