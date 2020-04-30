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
        function displayFunction(data) {
            console.log(data)
        }
        fetch('http://localhost:3000')
        .then(response => response.json)
        .then(data => displayFunction(data))
    }

    getData()
})
