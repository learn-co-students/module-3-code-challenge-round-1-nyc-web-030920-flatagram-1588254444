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
        img[0].src = image.image
    }

    // card.addEventListener('click', event => {
    //     if (event.target.className === 'like-button')
    // })




getImage()

})