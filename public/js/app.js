console.log('client side JS loaded successfully');

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = error.message
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forcast
            }
        })
    })
})