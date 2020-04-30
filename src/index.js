/* 1. ok Get image from db. (fetch) OK
    2. OK render image onto webpage w/ it's likes and comments
    3. isolate heart icon.
    4. add eventlistener (click) on heart icon to increase image likes
    5. add like to database (fetch) patch
    6. isolate comment section (form)
    7. isolate post button (submit) prevent default
    8. no persistence needed for comments but do it anyways
*/



document.addEventListener(`DOMContentLoaded`, () => {
    const baseUrl = "http://localhost:3000/image"
    const reqHeaders = { "Content-Type": "application/json",
"Accept": "application/json"}
    const imageLocation = document.getElementsByClassName("image")[0]
    const commentLocation = document.getElementsByClassName("comments")[0]
    const likes = document.getElementsByClassName("likes")[0]
    const likeBtn = document.querySelector(".like-button")
    const getImage = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(image => renderImage(image))
    }

    function renderImage(image){
        imageLocation.src = image.image
        renderComments(image)
        renderLikes(image)
    }

    function renderComments(source){
        const comments = commentLocation.childNodes
        comments[1].textContent = source.comments[0].content
        comments[3].textContent = source.comments[1].content
        comments[5].textContent = source.comments[2].content
    }

    function renderLikes(source){
        likes.textContent = `${source.likes} likes`
    }

    likeBtn.addEventListener("click", event => {
        let newCount = parseInt(likes.textContent) + 1 
        likes.textContent = `${newCount} likes`
        fetch(baseUrl), {
            method: "PATCH",
            headers: reqHeaders,
            body: JSON.stringify({"likes":`${parseInt(newCount)}`})
        }
    })

    getImage()
})