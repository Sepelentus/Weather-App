let weather={
    apiKey:"591a93a5fb54ef4689a0072de6514c8c",
    fetchWeather: function (ciudad) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            ciudad +
            "&units=metric&appid=" +
            this.apiKey
            )
            .then((Response)=>{
                if(!Response.ok){
                    alert("Clima no encontrado.");
                    throw new Error("Clima no encontrado.");
                }
                return Response.json();
            })
            .then((data)=>this.displayWeather(data));
        },
        displayWeather:function (data) {
            const {name} = data;
            const {icono, descripcion} = data.weather[0];
            const {temperatura, humedad} = data.main;
            const {speed} = data.wind;
            document.querySelector(".ciudad").innerText = "Clima en " + name;
            document.querySelector(".icono").src = "https://openweathermap.org/img/wn/" + icono + ".png";
            document.querySelector(".descripcion").innerText = descripcion;
            document.querySelector(".temperatura").innerText = temperatura + "°C";
            document.querySelector(".humedad").innerText = "Humedad: " + humedad + "%";
            document.querySelector(".ciudad").innerText = "Velocidad viento: " + speed + " km/h";
            document.querySelector(".clima").classList.remove("loading");
        },
        search: function(){
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
    };


        document.querySelector(".boton-buscar").addEventListener("click",function () {
            weather.search();
        }
);

document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
            if (event.key == "Enter"){
                weather.search();
            }
        });
