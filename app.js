const err = document.getElementById('location-error');
const apiId = "c1a4bea90e1f5c23366767bdf6b0aa49";
 
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let WeatherIcon = document.querySelector("img");
    let degreeSection = document.querySelector(".degree-section");
    let tempUnit = document.querySelector("span");

    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                const {temp} = data.main;
                const {description} = data.weather[0];
                const {name} = data;
                const {country} = data.sys;
                const {icon} = data.weather[0];
                console.log(data);

                // Set DOM elements from the API
                temperatureDegree.textContent = `${temp-273.15}°`;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = `${name} / ${country}`;
                WeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                // Change temp to farhenheit
                tempUnit.textContent = "C";

                degreeSection.addEventListener("click", () => {
                    if(tempUnit.textContent==="C"){
                        tempUnit.textContent = "F";
                        temperatureDegree.textContent = ((temp-273.15) *(9/5))+32;
                        temperatureDegree.textContent += "°";
                    }else if(tempUnit.textContent==="F"){
                        tempUnit.textContent = "K";
                        temperatureDegree.textContent = (temp);
                        temperatureDegree.textContent += "°";

                    } else{
                        tempUnit.textContent = "C";
                        temperatureDegree.textContent = (temp-273.15);
                        temperatureDegree.textContent += "°";

                    }
                    
                });

            })
        });

        
    }
});