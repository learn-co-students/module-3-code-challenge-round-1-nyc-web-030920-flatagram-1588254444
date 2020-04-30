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
    const requestHeaders = { "Content-Type": "application/json",
    "Accept": "application/json"}    
    const imageLocation = document.getElementsByClassName("image")[0]
    const commentLocation = document.getElementsByClassName("comments")[0]
    const titleLocation = document.querySelector(".title")
    const likes = document.getElementsByClassName("likes")[0]
    const likeBtn = document.querySelector(".like-button")
    const commentInput = document.querySelector(".comment-input")
    const commentForm = document.querySelector(".comment-form")
    const commentBtn = commentForm.querySelector(".comment-button")
    const likesSection = document.querySelector(".likes-section")
    const downBtn = document.createElement("button")
    downBtn.innerText = "downvote"
    likesSection.append(downBtn)

    const getImage = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(image => renderImage(image))
    }    

    function renderImage(image){
        imageLocation.src = image.image
        renderComments(image)
        renderLikes(image)
        renderTitle(image)
    }    

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
    
        function renderComments(source){
        const comments = commentLocation.childNodes
        comments[1].textContent = source.comments[0].content
        comments[3].textContent = source.comments[1].content
        comments[5].textContent = source.comments[2].content
    }    

    function renderLikes(source){
        likes.textContent = `${source.likes} likes`
    }    

    function renderTitle(source){
        titleLocation.textContent = source.title
    }    

    likesSection.addEventListener("click", event => {
        if(event.target === likeBtn){
            const newCount = parseInt(likes.textContent) + 1     
            likes.textContent = `${newCount} likes`
            patchLikes(likes)
        }
        else if (event.target === downBtn){
            const newCount = parseInt(likes.textContent) - 1
            likes.textContent = `${newCount} likes`
            patchLikes(likes)
        }   
        else null 
    })    

    //not persisting to database. I believe I'm formatting the body wrong. 
    function patchLikes(newCount){        
        fetch("http://localhost:3000/image"), {
            method: "PATCH",
            headers: requestHeaders,
            body: JSON.stringify({
            "likes": `${newCount}`    
            })
        }    
    }           

    commentForm.addEventListener("submit", event => {
        event.preventDefault()
        let comment = commentInput.value 
        newComment = document.createElement(`li`)
        newComment.textContent = comment
        commentLocation.append(newComment)
        commentForm.reset()
        //Not persisting to database.
        fetch(baseUrl), {
            method: "POST",    
            headers: requestHeaders,
            body: JSON.stringify({
                "comments": `${comment}`    
            })
        }
    })    

    getImage()
})