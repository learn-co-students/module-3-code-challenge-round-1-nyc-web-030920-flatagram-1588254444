// write your code here
// fetch image upon page load
// find out where to append the image
// append image to the page
// add event listener to image likes
// prevent default so page doesnt load and without likes 
// add a comment--- no fetch required since persistenc isnt needed

document.addEventListener("DOMContentLoaded", () => {
    
    const getImages = () => {
        fetch('http://localhost:3000/image')
        .then(resp => resp.json())
        .then(showImages)
    }

    const showImages = image => {
        console.log(image)
        let imageCard = document.getElementsByClassName("image-card")[0]
        console.log(imageCard)

        const div = document.createElement('div')

            imageCard.innerHTML = `
            <h2 class="title">${image.title}</h2>
            <img src= ${image.image} class="image" />
            <div class="likes-section">
            <span class="likes"> ${image.likes}likes</span>
            <button class="like-button">♥</button>
            </div>
            <ul class="comments">
            <li> ${image.comments[0]} </li>
            <li> ${image.comments[1]} </li>
            <li> ${image.comments[2]} </li>
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




    }

    document.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.target.className === "like-button")
       if (e.target.className === "like-button"){
            let span= e.target.previousElementsSibling.innerText
            console.log(span)
            let likes = parseInt(span)
            let newLikes = likes + 1
       }
    })

    document.addEventListener('submit', e => {
        e.preventDefault()
        const commentForm = e.target

        const comment = form.comment.value
    
    })


    getImages()

})
