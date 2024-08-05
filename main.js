
const apiKey = '710f2b60aa6f456db41130359242307';


const header = document.querySelector('#header');
const form = document.querySelector('#form');
const input = document.querySelector('#cityInput');


function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) {
        prevCard.remove();
    }
}


function showError(errorMessage){
        const html = `<div class="card">${errorMessage}</div>`;
        header.insertAdjacentHTML('afterend',html);
}

function showCard({name, country,temp, icon, text}) {
    
    const html = `<div class="card">
                        <h2 class="card-city">${name} <span>${country}</span></h2>
                        <div class="card-weather">
                            <div class="card-value">
                                ${temp} ℃
                            </div>
                            <img class="card-img" src="${icon}" alt="weather" >
                        </div>

                        <div class="card-description">${text}</div>

                    </div>`;
                        header.insertAdjacentHTML('afterend',html);
                    }

async function getWeather(city){
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response =await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
        
    }

/* The way of getting submit*/
form.onsubmit = async function (e) {
    
    e.preventDefault();

    let city= input.value.trim();
    
    const data = await getWeather(city);

    if (data.error) {
            removeCard();
            showError(data.error.message);
        }

    else {
         removeCard();

         const weatherData = {
            name: data.location.name,
            country : data.location.country,
            temp : data.current.temp_c,
            icon : data.current.condition.icon,
            text : data.current.condition.text


         };
        showCard(weatherData);
            }

    
}

