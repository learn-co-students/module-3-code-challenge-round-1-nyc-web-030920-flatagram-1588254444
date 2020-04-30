// write your code here
// The endpoints you will need are:
//GET /image
//PATCH /image

//Pseudocode:

// See the image received from the server, including its likes and 
//comments when the page loads:
//1)render each image from the servers and show its likes and comments when it loads 
//Lo

// Click on the heart icon to increase image likes, and still see 
//them when I reload the page
//1)Add event listener *click* when the like btn is clicked, PATCH rqst
//2)likes must save when the page refreshes

// Add a comment (no persistence needed)
//PATCH request to add a comment to a picture


const getImages = () => {
    fetch('http://localhost:3000/image')
    .then(response => response.json())
    .then(console.log)
}