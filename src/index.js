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

    const showImages = images => {
        imageCard.innerHTML = ' '
        let imageCard = document.getElementsByClassName("image-card")[0]
        console.log(imageCard)

        images.forEach(image => {
            imageCard.innerHTMl = `
            <h2 class="title">${image.title}</h2>
            <img src= ${image.image} class="image" />
            <div class="likes-section">
            <span class="likes"> ${image.likes}likes</span>
            <button class="like-button">♥</button>
            </div>
            <ul class="comments">
            <li>Get rid of these comments</li>
            <li>And replace them with the real ones</li>
            <li>From the server</li>
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

        })
    }


    getImages()

})
