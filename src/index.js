
// PATCH /image

//Click on heart icon to increase image likes and see them when reloaded
// Add a comment 

document.addEventListener("DOMContentLoaded", event => {
    const card = document.querySelector('.image-card')
    const url = `http://localhost:3000/image`

    getUsers()
    likes()
    addComment()

    function getUsers() {
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

        commentUl.innerHTML = ''
        obj.comments.forEach(comment => {
            let id = comment.id
            let content = comment.content

            let li = document.createElement('li')
            li.dataset.id = id
            li.innerText = content
            commentUl.appendChild(li)
        })
    }

    function likes() {
        card.addEventListener('click', event => {
            if (event.target.className === "like-button") {
                let parent = event.target.parentNode
                let likeNode = parent.querySelector('span')
                let likes = parseInt(likeNode.innerText)
                likes += 1
                likeNode.innerText = `${likes} Likes`

                fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "likes": likes
                    })
                }).then(resp => resp.json())
                    .then(resp => console.log(resp)) // NEED TO TWEAK TO UPDATE RELOAD PAGE, I KNOW
            }
        })
    }

    // ADD COMMENT AND THEN WORK BACK ON PESSIMISTIC RENDER FOR LIKES

    function addComment() {
        let form = document.querySelector('form.comment-form')
        let commentUl = card.querySelector('ul.comments')

        form.addEventListener('submit', event => {
            event.preventDefault()
            let comment = form.querySelector('input').value
            let li = document.createElement('li')
            li.innerText = comment
            // li.dataset.id = li.previousSibling.dataset.id + 1
            commentUl.appendChild(li)
            li.dataset.id = parseInt(li.previousSibling.dataset.id) + 1
            let list = commentUl.querySelectorAll('li')
            let listArray = Array.from(list)

            return listArray.map(node => {
                let obj = {
                    "id": node.dataset.id,
                    "content": node.innerText
                }
                return obj
            })
        })
    }

})