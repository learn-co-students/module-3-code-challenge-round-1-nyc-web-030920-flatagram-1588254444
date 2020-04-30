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
        console.log(comments[0].querySelectorAll('li')[0].innerText)
        let li = document.createElement('li')
        image.comments.forEach((comment) => {
            let i = 0 
            let cmmt =comments[0].querySelectorAll('li')[i].innerText
            cmmt = comment.content
            console.log(cmmt)
            console.log(comment.content)
            i++
        })
        console.log(image.comments[0].content)
    }

    // card.addEventListener('click', event => {
    //     if (event.target.className === 'like-button')
    // })




getImage()

})