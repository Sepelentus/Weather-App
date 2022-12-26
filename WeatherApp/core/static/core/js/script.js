let weather = {
    apiKey:"",      // Add apiKey from openweathermap
    fetchWeather: function (ciudad) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            ciudad +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((Response) => {
                if (!Response.ok) {
                    alert("Clima no encontrado.");
                    throw new Error("Clima no encontrado.");
                }
                return Response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country} = data.sys;
        const { icon } = data.weather[0];
        const { description } = data.weather[0];
        const { temp } = data.main;
        const { humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".ciudad").innerText = "Clima en " + name + ", " + country;
        document.querySelector(".temperatura").innerText = temp + "°C";
        document.querySelector(".icono").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".descripcion").innerText = description;
        document.querySelector(".humedad").innerText = "Humedad: " + humidity + "%";
        document.querySelector(".viento").innerText = "Velocidad viento: " + speed + " km/h";
        document.querySelector(".clima").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};


document.querySelector(".boton-buscar").addEventListener("click", function () {
    weather.search();
}
);

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

            // Credits to DenverCoder1 for the idea and base code for the JavaScript and CSS.
            // This was just a test for implementing API to Django based project, very fun to do tbh