// write your code here

// do the fecth and get the info about dog
// do like function 
// do post function 

document.addEventListener('DOMContentLoaded', (event) => {

    getImage()


    function  getImage(){ 
    fetch("http://localhost:3000/image")
    .then(r => r.json())
    }



let likeButton = document.getElementsByClassName("like-button")[0]

likeButton.addEventListener('click',increaseLike )

function increaseLike(event) {
    let span = document.getElementsByClassName('likes')[0]
    span.innerHTML = parseInt(span.innerHTML)+1 
    const likes = span.innerHTML


    fetch('http://localhost:3000/image',{
        method: "PATCH", 
        header: {
        'Content-Type': 'application/json',  
        'Accept': 'application/json'
        },
          body: JSON.stringify({likes})
    } )

}


    const ul = document.getElementsByClassName('comments')[0]
     ul.innerHTML = `<li>What a cute dog!</li>
     <li>He has a nose for this!</li>
     <li>Woof!</li>`
    
    const image = document.getElementsByClassName('image')[0]
    image.src = "./assets/coder-dog.png"

    const title = document.getElementsByClassName('title')[0]
    title.textContent = "Coder dog"


   const  commentButton = document.getElementsByClassName('comment-form')[0]
    commentButton.addEventListener('submit', comment)

   function comment(event){
       event.preventDefault()
   const  input =  document.getElementsByClassName('comment-input')[0]

     
       input.textContent.value = comments
    

       
    fetch('http://localhost:3000/image',{
        method: "PATCH",
        header: {
            'Content-Type': 'application/json',  
            'Accept': 'application/json'
            },
        body: JSON.stringify({comments})
    })


    // commentButton.name = .value
      

    }







    
    






});