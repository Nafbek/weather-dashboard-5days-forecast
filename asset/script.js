console.log("'I'm connected'")

var myKey = '34e81c1188d1e55fbd1d99bde32f6e18'
var city;

var searchButton = document.getElementById('search-btn')
var userCity = document.querySelector('input[name ="city-input"]')
// var cityNameDiv = $('#city-now') ???why not working
var cityNameDiv = document.getElementById('city-now')
var forecstAllContainer = document.getElementById('forecast-container')
var fivedayWrapperDiv = document.getElementById('five-dayWrapperDiv')
var fiveDayHEl = document.getElementById('fiveDay-heading')


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

            cityNamePEl.setAttribute('style', 'font-weight:bold; font-size: large')


            var lat = data[0].lat
            var lon = data[0].lon

            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + myKey + '&units=imperial')
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    var todayEl = document.createElement('span')
                    var todayIconEl = document.createElement('img')
                    var todayTempP = document.createElement('p')
                    var todayWindP = document.createElement('p')
                    var todayHumidityP = document.createElement('p')

                    todayEl.textContent = ' (' + dayjs(data.list[0].dt_txt).format('M/DD/YYYY') + ')'
                    todayIconEl.src = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
                    todayTempP.textContent = 'Temp: ' + data.list[0].main.temp + '°F'
                    todayWindP.textContent = 'Wind: ' + data.list[0].wind.speed + 'MPH'
                    todayHumidityP.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %'

                    // var weatherNowDiv = document.createElement('div')


                    cityNamePEl.appendChild(todayEl)
                    cityNameDiv.appendChild(todayIconEl)
                    cityNameDiv.appendChild(todayTempP)
                    cityNameDiv.appendChild(todayWindP)
                    cityNameDiv.appendChild(todayHumidityP)

                    cityNameDiv.classList.add('size-todayDiv')

                    todayIconEl.setAttribute('style', 'width: 30px; height:30px')


                    fiveDayHEl.textContent = '5-Day Forecast:'
                    fiveDayHEl.setAttribute('style', 'font-weight: bold')

                    for (var i = 1; i < data.list.length; i += 8) {

                        var dateEl = document.createElement('p')
                        var iconImgEl = document.createElement('img')
                        var tempP = document.createElement('p')
                        var windP = document.createElement('p')
                        var humidityP = document.createElement('p')

                        dateEl.textContent = dayjs(data.list[i + 1].dt_txt).format('M/DD/YYYY')
                        iconImgEl.src = 'http://openweathermap.org/img/w/' + data.list[i + 1].weather[0].icon + '.png';
                        tempP.textContent = 'Temp: ' + data.list[i + 1].main.temp + '°F'
                        windP.textContent = 'Wind: ' + data.list[i + 1].wind.speed + ' MPH'
                        humidityP.textContent = 'Humidity: ' + data.list[i + 1].main.humidity + ' %'

                        var eachForecastDiv = document.createElement('div')
                        fivedayWrapperDiv.appendChild(eachForecastDiv)

                        // fivedayWrapperDiv.setAttribute('style', 'border: solid')

                        // forecstAllContainer.appendChild(eachForecastDiv)

                        eachForecastDiv.appendChild(dateEl)
                        eachForecastDiv.appendChild(iconImgEl)
                        eachForecastDiv.appendChild(tempP)
                        eachForecastDiv.appendChild(windP)
                        eachForecastDiv.appendChild(humidityP)

                        eachForecastDiv.setAttribute('style', 'border: solid; margin: 1%;  background-color: gray; color: white; padding: 0 1%; ')
                        iconImgEl.setAttribute('style', 'width: 30px; height:30px')

                        eachForecastDiv.classList.add('eachForecast-items')

                    }


                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))

   

}

function saveHistory() {
    console.log('save history function')


}




