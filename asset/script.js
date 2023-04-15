console.log("'I'm connected'")

var myKey = '34e81c1188d1e55fbd1d99bde32f6e18'
var city;

var searchButton = document.getElementById('search-btn')
var userCity = document.querySelector('input[name ="city-input"]')
// var cityNameDiv = $('#city-now') ???why not working
var cityNameDiv = document.getElementById('city-now')


// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))



// fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))



searchButton.addEventListener('click', function (event) {
    event.preventDefault()

    //
    displayForecast()
    saveHistory()

})

//    







function displayForecast() {


    console.log(userCity.value)
    city = userCity.value;

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + myKey)  //should i limit the number of cities with same name?
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var cityNamePEl = document.createElement('p')
            cityNamePEl.textContent = data[0].name
            console.log(data[0].name)
            cityNameDiv.appendChild(cityNamePEl)


            var lat = data[0].lat
            var lon = data[0].lon

            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=8&appid=' + myKey + '&units=imperial')
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    for (var i = 0; i < 6; i++) {

                        var dateEl = document.createElement('span')
                        var iconImgEl = document.createElement('img')
                        var tempP = document.createElement('p')
                        var windP = document.createElement('p')
                        var humidityP = document.createElement('p')

                        dateEl.textContent = dayjs(data.list[i].dt_txt).format('M/DD/YYYY')
                        // console.log(dayjs(data.list[0].dt_txt).format('M dd yyyy'))
                        // iconImgEl = data.list[i].weather[i].icon + '.png'
                        iconImgEl.src = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
                        tempP.textContent = 'temp: ' + data.list[i].main.temp + '°F'
                        windP.textContent =  'Wind: ' + data.list[i].wind.speed +  'MPH'
                        humidityP.textContent ='Humidity: ' + data.list[i].main.humidity + ' %'

                        var forecastDiv = document.createElement('div')
                        var forecstContainer = document.getElementById('forecast-container')
                        forecstContainer.appendChild(forecastDiv)
                        forecastDiv.appendChild(dateEl)
                        forecastDiv.appendChild(iconImgEl)
                        forecastDiv.appendChild(tempP)
                        forecastDiv.appendChild(windP)
                        forecastDiv.appendChild(humidityP)



                       

                    }


                })
                .catch(err => console.log(err))





        })
        .catch(err => console.log(err))



}

function saveHistory() {
    console.log('save history function')

}




