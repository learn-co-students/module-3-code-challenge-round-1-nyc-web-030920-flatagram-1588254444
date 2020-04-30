// // write your code here
//√ See the image received from the server, including its likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistence needed)



document.addEventListener("DOMContentLoaded", function(){

    const url = "http://localhost:3000/image"

    getImage()
   
    function getImage(){
        return fetch(url)
        .then(r=> r.json())
        .then(image => {      
            console.log(image.title)
            const imgCard = document.getElementsByClassName("image-card")
            const h2 = document.getElementsByClassName("title")
            h2.innertext = `${image.title}`
            const img = document.getElementsByClassName("image")
            img.src = "${image.image}"
            const ul = document.getElementsByClassName("comments")
            console.log(ul)
           
            ul.innertext = `
                ${image.comments}.forEach(function(comment){
                comment.content
            `
            document.addEventListener("click", function(event){
                event.preventDefault()
                if(event.target.className === "like-button"){

                }
                
                if(event.target.className === "commment-button"){
                    

                }
                
            })
        
        })

    }
    

})
