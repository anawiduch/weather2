
const apiKey = '710f2b60aa6f456db41130359242307';

/* Get city name*/
const header = document.querySelector('#header');
const form = document.querySelector('#form');
const input = document.querySelector('#cityInput');


function removeCard() {const prevCard = document.querySelector('.card');
if (prevCard) {prevCard.remove();};}


function showError(errorMessage){
        const html = `<div class="card">${errorMessage}</div>`;
        header.insertAdjacentHTML('afterend',html);
};

/* The way of getting submit*/
form.onsubmit = function (e) {
    e.preventDefault();
    let city= input.value.trim();

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
    .then((response) => {
    return response.json();
    })
    .then ((data) => {

        console.log(data);

        // Check for the error

        if (data.error) {
            removeCard();
            showError(data.error.message);
        }
        else {
            // Remove the previos card
        removeCard();
       
        // Card 
        const html = `<div class="card">
                        <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                        <div class="card-weather">
                            <div class="card-value">
                                ${data.current.temp_c} ℃
                            </div>
                            <img class="card-img" src="${data.current.condition.icon}" alt="weather" >
                        </div>

                        <div class="card-description">${data.current.condition.text}</div>

                    </div>`;
        header.insertAdjacentHTML('afterend',html);}
        
        
    });
}

