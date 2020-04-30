// write your code here
//function getData
//get fetch request and display in DOM within getData
//display function withing getData
//also get rid of old text in display function
//function likePic
//send patch fetch request and call getData within likePic
//function addComment
//no fetch just add to DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('test')

    function getData() {
        function displayFunction(x) {
            const picTitle = document.getElementsByClassName('title')[0]
            const picLikes = document.getElementsByClassName('likes')[0]
            const picLink = document.getElementsByClassName('image')[0]
            const picComments = document.getElementsByClassName('comments')[0]
            console.log(x.title)
            picTitle.innerText = x.title
            picLikes.innerText = `${x.likes} likes`
            picLink.src = x.image
            console.log(x.comments)
            x.comments.forEach(comment => {
                let commentLi = document.createElement('li') 
                commentLi.innerText = comment.content
                picComments.appendChild(commentLi)
            })
            

        }
        fetch('http://localhost:3000/image')
        .then(response => response.json())
        .then(data => displayFunction(data))
    }

    getData()
})
