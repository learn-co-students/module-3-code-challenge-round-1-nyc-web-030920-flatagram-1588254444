// write your code here
// √GET IMAGES FROM SERVER
// √render image
// add event listener for like button
// add listener for post button
// update likes on front end and backend without refreshing
// patch request to /image dataset for like
// display updated like and posts on page
document.addEventListener('DOMContentLoaded', () => {
    const imageURL = 'http://localhost:3000/image'
    const imageCard = document.getElementsByClassName('image-card')
    let card = imageCard[0]
    function getImage(){
        fetch(imageURL)
        .then(response => response.json())
        .then(image => renderImage(image))
    }
    function renderImage(image){
        let img = document.getElementsByClassName('image')
        let parent = img[0].parentNode
        let title = parent.getElementsByClassName('title')
        title[0].innerText = image.title
        img[0].src = image.image
        comments = parent.getElementsByClassName('comments')
        // console.log(comments[0].querySelectorAll('li')[0].innerText)
        // let i = 0
        // while (i < comments.length){ 
        //     let newComment = image.comments[i].content
        //     let cmmt = comments[0].querySelectorAll('li')[i].innerText
        //     console.log(newComment, cmmt)
        //     cmmt = newComment
        //     i++
        // }
    }

    card.addEventListener('click', event => {
        if (event.target.className === 'like-button'){
        span = event.target.previousElementSibling
        likes = parseInt(span.innerText)
        span.innerText = `${++likes} likes`
        fetch(imageURL, {
            method: "PATCH"
        headers: {
                "accept": "application/json"
                "content-type": "application/json"
            },
            body: JSON.stringify({
                likes
            })
        })
        
    }
    })




getImage()

})