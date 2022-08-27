window.onload = () =>{
   
}

function loadHTML(){
    fetch('teste.html')
    .then(response=> response.text())
    .then(text=> document.getElementById('homePage').innerHTML = text);
}