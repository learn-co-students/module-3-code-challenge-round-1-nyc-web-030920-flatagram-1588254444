// write your code here




const baseUrl = 'http://localhost:3000/image'
document.addEventListener('DOMContentLoaded',function(){

    fetchImage()
   
    fetchLikes()


    fetchComments()

    addLike()

    addComment()

})

function fetchImage(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(pic => postPicture(pic))
    // console.log(pic)
}

function postPicture(pic){
    let wallPic = document.querySelector('.image')
    // debugger
    let titlePic = document.querySelector('.title')
    // console.log(wallpic)
    wallPic.src = pic.image
    titlePic.innerText = pic.title
    // debugger
    // debugger
}

function fetchLikes(){
    fetch(baseUrl)
    .then(response =>response.json())
    .then(pic => postLikes(pic))
}

function postLikes(pic){
    let likes = document.querySelector('.likes')
    // debugger
    // console.log(likes)
    // debugger
    likes.innerText = pic.likes
}

function addLike(){
    let likeBtn = document.querySelector('.like-button')
    //  console.log(likeBtn)

    let likes = documet.querySelector('.likes')

    likeBtn.addEventListener('click',function(e){
        e.preventDefault()
        let likeInt = parseInt(likes.innerHTML)
        likeInt += 1
        likes.innerText = `$likeInt`

        let newLikes = {
            likeInt
        }

        fetch(baseUrl,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(newLikes)
        })
    })


}

function fetchComments(){
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(pic => postComments(pic))

}

function postComments(pic){
    let commentWall = document.querySelector('.comments')
    pic.comments.forEach(function(comment){
        let existingCom = document.createElement('li')
        existingCom.innerText = comment.content
        commentWall.append(existingCom)
    })
}



function addComment(){
    let commentForm = document.querySelector('.comment-form')

    commentForm.addEventListener('submit', function(e){
        e.preventDefault();

        let commentInput = document.querySelector('.comment-input')
        let commentWall = document.querySelector('.comments')
        //  debugger
        let comment = document.createElement('li')
        comment.innerText = commentInput.value

        commentWall.append(comment)

        fetch(baseUrl,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                content: commentInput.value
            })


        }
            )

    })
}
