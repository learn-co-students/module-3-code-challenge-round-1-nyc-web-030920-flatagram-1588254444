// write your code here
document.addEventListener('DOMContentLoaded', () => {
    function showComments()
    {
        //get the ul that contains the comments
        let commentsList = document.querySelector('.comments');
        //get the comments from the server
        fetch('http://localhost:3000/image')
        .then(resp => resp.json())
        .then((image) => {
            image.comments.forEach(comment => {
                //append them to commentList in <li>'s
                let li = document.createElement('li');
                li.textContent = comment.content;
                commentsList.appendChild(li);
                //call addCommentToDB to persist 
                //only if we get there
                //pass in each comment
            })
        })
    }

    //Click on the heart icon to increase image likes
    //still see them when I reload the page -> update db
    //click listener on like-button
    let numLikes = 0; //starts as 0 anyway
    let likeBtn = document.querySelector('.like-button');
    likeBtn.addEventListener('click', event => {
        event.preventDefault();
        //likes start at 0 in db
        //first update DOM
        //gets the span that contains the likes
        let likes = document.querySelector('.likes');
        //increase numLikes
        numLikes += 1;
        //put on DOM
        likes.textContent = `${numLikes} likes`;
        //then send to db
        //first get the likes from the server
        //then in that update them
        //should give access to the image object on server
        fetch('http://localhost:3000/image')
        .then(response => response.json())
        .then(image => {
            
        })
        fetch('http://localhost:3000/image', {
            method: "PATCH",
            headers : {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(numLikes)
        })
        .then(resp => resp.json())
        .then(console.log('updated'))
    })

    function getImage()
    {
        //get the image from the server
        //display it
        fetch('http://localhost:3000/image')
        .then(resp => resp.json)
        .then(data => {
            //get the image on DOM
            let imageCard = document.querySelector('.image-card');
            let kids = imageCard.childNodes; //gets all the children
            console.log(kids)
            console.log(data.title)
            //h2
            kids[1].textContent = data.title;
        })
    }

    showComments();
    getImage();
})