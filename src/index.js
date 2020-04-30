const card = document.querySelector('.image-card')
const url = `http://localhost:3000/image`

document.addEventListener("DOMContentLoaded", event => {
    getUsers()
    likes()
    addComment()
})
    //  A C C E S S  D B 
    function getUsers() {
        fetch(url)
            .then(resp => resp.json())
            .then(obj => {
                renderUser(obj)
                console.log(obj)
            })
    }
    // I M P O R T  T O  D O M
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
    
    // P O S T  B U T T O N  L O G I C
    function addComment() {
        let form = document.querySelector('form.comment-form')
        let commentUl = card.querySelector('ul.comments')
        
        form.addEventListener('submit', event => {
            event.preventDefault()
            let comment = form.querySelector('input').value
            let li = document.createElement('li')
            li.innerText = comment
            commentUl.appendChild(li)
            
        })
    }
    

// L I K E  B U T T O N   L O G I C 
function likes() {
    card.addEventListener('click', event => {
        if (event.target.className === "like-button") {
            let parent = event.target.parentNode
            let likeNode = parent.querySelector('span')
            let likes = parseInt(likeNode.innerText)
            likes += 1
            likeNode.innerText = `${likes} Likes`
            // DOES SAVE TO DB 
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