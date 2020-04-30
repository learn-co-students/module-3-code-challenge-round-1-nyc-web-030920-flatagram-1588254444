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
            })
        })
    }

    //Click on the heart icon to increase image likes
    //still see them when I reload the page -> update db
    //click listener on like-button
    let likeBtn = document.querySelector('.like-button');
    likeBtn.addEventListener('click', event => {
        event.preventDefault();
        //likes start at 0 in db
        //first update DOM
        //gets the span that contains the likes
        let likes = document.querySelector('.likes');
        
        //put on DOM
        let numLikes = showLikes();
        // console.log(numLikes)
        numLikes += 1;
        likes.textContent = `${numLikes} likes`;
        //then send to db
        //first get the likes from the server
        //then in that update them
        //should give access to the image object on server
        
        //gets the number of likes
        
        fetch('http://localhost:3000/image', {
            method: "PATCH",
            headers : {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({likes: numLikes})
        })
        .then(resp => resp.json())
        .then(console.log('updated'))
    })

    function getImage()
    {
        //get the image from the server
        //display it
        fetch('http://localhost:3000/image')
        .then(resp => resp.json())
        .then(data => {
            //get the image on DOM
            let imageCard = document.querySelector('.image-card');
            let kids = imageCard.childNodes; //gets all the children
            console.log(kids)
            // console.log(data.title)
            //h2
            kids[1].textContent = data.title;
            //img
            kids[3].src = data.image;
        })
    }

    //will return the inital number of likes from db
    function showLikes()
    {
        fetch('http://localhost:3000/image')
        .then(response => response.json())
        .then(image => {
            let numLikes = image.likes;
            console.log(image.likes)
            let likes = document.querySelector('.likes');

            likes.textContent = `${numLikes}`
            // console.log(numLikes)
            return numLikes;    
        })
    }
    //event listener for comments posted
    document.addEventListener('submit', event => {
        event.preventDefault();
        //get comment block
        let commentsList = document.querySelector('.comments');
        //get text from comment form
        let commentForm = event.target;
        let newComment = commentForm.comment.value;
        let li = document.createElement('li');
        li.textContent = newComment;
        // addComment(newComment); //adds to db
        commentsList.appendChild(li);
        commentForm.reset();
    })

    //this function adds the comment to the db
    // function addComment(comment)
    // {

    // }
    
    /*()
    //TO WHOEVER READS THIS:
    //i some how made likes = null in the db
    //not sure how
    //was trying to fix how i got the likes from the db
    //of course this happened with 5 mins left
    //am doing my best to fix it lol
    //before i changed stuff it mostly worked
    //i think it all worked in my last commit actually
    //all that wasnt working is it wasnt gettting the likes from the db initially
    //so it would always start at 0
    //all i wanted to change was that but i somehow broke so much more 
    //please have mercy on my soul
    */ //forgot about block comments lmao

    showLikes();
    showComments();
    getImage();
})