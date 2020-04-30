// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/image"
    const requestHeaders = {
        'accept': 'application/json',
        'content-type': 'application/json'
    }

    fetch(baseURL)
        .then(resp => resp.json())
        .then(createImage)

    function createImage(image) {
        const imageCard = document.querySelector(".image-card")
        imageCard.innerHTML = `
        <h2 class="title">${image.title}</h2>
        <img src=${image.image} class="image" />
        <div class="likes-section">
            <span class="likes">${image.likes}</span>
            <button class="like-button">♥</button>
        `

        let imgComments = document.querySelector('.comments')
        image.comments.forEach((comment) => {
            let commentLi = document.createElement("li")
            commentLi.innerText = comment.content
            commentLi.id = `${comment.id}`
            imgComments.append(commentLi)
        })
    }

    document.addEventListener('click', event => {
        if(event.target.className === "like-button") {
            let likes = parseInt(event.target.previousElementSibling.innerText)
            likes++ 
    
            fetch(baseURL, {
                method: "PATCH",
                headers: requestHeaders,
                body: JSON.stringify({"likes": likes})
            })
            .then(resp => resp.json())
            .then(response => {
                event.target.previousElementSibling.innerText = `${response.likes} Likes`
            })
        }
    })

    
})

/*
- GET the image, including √likes and comments
- √Click listener on the heart btn to increase image likes
- Submit listener on the form to add comments (not persistent)

Have a working commit with all the Core Deliverables 1st!

- Still see the comments written after reloading the page
- Downvote an image
- Delete a comment
*/