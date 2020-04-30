// write your code here
const url = `http://localhost:3000/image`
const imageCard = document.querySelector(".image-card")
const commentForm = document.querySelector('.comment-form')


document.addEventListener("DOMContentLoaded", () => {
    fetch(url).then(response => response.json()).then((post) => { renderPost(post) })
    // fetch from json and pass it to function renderPost

    const renderPost = post => {
        // define all variables for element selectors
        let postTitle = imageCard.querySelector('.title')
        let postComments = imageCard.querySelector('.comments')
        let likeButton = imageCard.querySelector('.like-button')
        let postImage = imageCard.querySelector('img')
        let postLikes = imageCard.querySelector('.likes')

        // clean it up
        postTitle.innerText = post.title
        postImage.src = post.image
        postLikes.innerText = `${post.likes} likes`

        postComments.innerHTML = ""

        // for each comment found in JSON
        // create element li and append it to the postComments by interpolation
        post.comments.forEach((comment) => {
            let commentLi = document.createElement('li')
            commentLi.innerText = comment.content
            commentLi.id = `${comment.id}`
            postComments.append(commentLi)
        })

        // on click of the like button
        // fetch PATCH to update likes count
        likeButton.addEventListener("click", (event) => {
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    likes: post.likes + 1
                })
            })
                .then(response => response.json())
                .then((updatedPost) => {
                    post.likes = updatedPost.likes
                    postLikes.innerText = `${post.likes} likes`
                })
        })

        // comment input form for user to add a comment 
        let input = commentForm.querySelector('.comment-input')

        // on submit of the user inputed comment
        // prevent page reload
        // fetch PATCH
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault()

            // use the length to keep track of ID, and unshift comments
            let commentSIZE = post.comments.length
            
            // for shit/unshift
            let commentsArr = post.comments

            // fetch for PATCH. Update 
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: post.title,
                    likes: post.likes,
                    image: post.image,
                    comments: [...commentsArr, {
                        content: input.value,
                        id: commentSIZE + 1  
                    }]
                })
            })
            .then(response => response.json()).then((updatedPost) => {
                    let commentLi = document.createElement('li')
                    commentLi.innerText = updatedPost.comments[commentSIZE].content
                    
                    // append the new comment
                    postComments.append(commentLi)

                    // reset the form for the next comment
                    event.target.reset()
                })
        })
    }
})
