(()=> {
    const header = document.querySelector("#header");
    const form = document.querySelector("#form");
    const cityInput = document.querySelector("#cityInput");

    function clearCard() {
        const card = document.querySelector(".card");
        if (card) card.remove();
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        let city = cityInput.value.trim();

        fetch(`http://api.weatherapi.com/v1/current.json?key=710f2b60aa6f456db41130359242307&q=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    clearCard();
                    const errorHtml = `<div class="card">${data.error.message}</div>`;
                    header.insertAdjacentHTML("afterend", errorHtml);
                } else {
                    clearCard();
                    const weatherHtml = `
                        <div class="card">
                            <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                            <div class="card-weather">
                                <div class="card-value">${data.current.temp_c} ℃</div>
                                <img class="card-img" src="${data.current.condition.icon}" alt="weather">
                            </div>
                            <div class="card-description">${data.current.condition.text}</div>
                        </div>
                    `;
                    header.insertAdjacentHTML("afterend", weatherHtml);
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    };
})();
