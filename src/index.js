window.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/image')
    .then(response => response.json())
    .then(data => {
        data.forEach(function (element) {
            imgcrd = document.getElementById('image-card')
            console.log(imgcrd)

        })
    })
})
