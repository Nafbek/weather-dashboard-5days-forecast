//Weather API key assignment to the variable
var myKey = '34e81c1188d1e55fbd1d99bde32f6e18'

//Select DOM elements and define variable
var searchButton = document.getElementById('search-btn')
var userCity = document.querySelector('input[name ="city-input"]')
// var cityNameDiv = $('#city-now') ???why not working
var cityNameDiv = document.getElementById('city-now')
var forecstAllContainer = document.getElementById('forecast-container')
var fivedayWrapperDiv = document.getElementById('five-dayWrapperDiv')
var fiveDayHEl = document.getElementById('fiveDay-heading')
var city;

//Add event listener to the search button
searchButton.addEventListener('click', function (event) {
    event.preventDefault()

//Clear the previously  displayed city weather forecast  
    cityNameDiv.innerHTML = ''
    fivedayWrapperDiv.innerHTML = ''

    displayForecast()
    saveHistory()
})

//Add event listener for the keydown event for any submission
document.addEventListener('keydown', function(event) {
    
    //Check if the key pressed is the enter key
    if (event.key =='Enter') {
        event.preventDefault()
     
//Clear the previously  displayed city weather forecast  
    cityNameDiv.innerHTML = ''
    fivedayWrapperDiv.innerHTML = ''

    displayForecast()
    saveHistory()
    }
})

//Display the weather forecast 
function displayForecast() {
    //Assign the value of the user to the city variable
    city = userCity.value;

    //Fetch the weather forecast data based on the user city search
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + myKey)  //should i limit the number of cities with same name?
        .then(res => res.json())
        .then(data => {

            //Create an element to hold the city name extracted from the data
            var cityNamePEl = document.createElement('p')
            cityNamePEl.textContent = data[0].name
            cityNameDiv.appendChild(cityNamePEl)

            //Style the city name paragraph
            cityNamePEl.setAttribute('style', 'font-weight:bold; font-size: large')

            //Define variables to hold the value of latitude and longitude 
            var lat = data[0].lat
            var lon = data[0].lon

            //Fetch the current weather forecast data
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + myKey + '&units=imperial')
                .then(res => res.json())
                .then(data => {
                    
                    //Create elements to hold today's weather value extracted from the data
                    var todayEl = document.createElement('span')
                    var todayIconEl = document.createElement('img')
                    var todayTempP = document.createElement('p')
                    var todayWindP = document.createElement('p')
                    var todayHumidityP = document.createElement('p')
                   
                    //var unixtimeStamp = data.dt

                    //Assign today's weather value extracted from the data to the variables created
                    todayEl.textContent = ' (' + dayjs(data.dt * (1000)).format('M/DD/YYYY') + ')'
                    todayIconEl.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
                    todayTempP.textContent = 'Temp: ' + data.main.temp + '°F'
                    todayWindP.textContent = 'Wind: ' + data.wind.speed + 'MPH'
                    todayHumidityP.textContent = 'Humidity: ' + data.main.humidity + ' %'

                    //Append the elements holding value to the parent element
                    cityNamePEl.appendChild(todayEl)
                    cityNameDiv.append(todayIconEl, todayTempP, todayWindP, todayHumidityP)

                    //Add a class to and style the elements
                    cityNameDiv.classList.add('size-todayDiv')
                    todayIconEl.setAttribute('style', 'width: 30px; height:30px')

                })

            //Fetch the five day weather forecast data for the given lacation coordinates
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + myKey + '&units=imperial')
                .then(res => res.json())
                .then(data => {
                    
                    //Write a heading to the five days forecast
                    fiveDayHEl.textContent = '5-Day Forecast:'
                    fiveDayHEl.setAttribute('style', 'font-weight: bold')

                    //Iterate over the entire data to extract specific data values
                    for (var i = 0; i < data.list.length; i += 8) {

                        //Create elements to hold the five days weather forecast
                        var dateEl = document.createElement('p')
                        var iconImgEl = document.createElement('img')
                        var tempP = document.createElement('p')
                        var windP = document.createElement('p')
                        var humidityP = document.createElement('p')

                        //Assign the five days weather forecast values to the variables created
                        dateEl.textContent = dayjs(data.list[i].dt_txt).format('M/DD/YYYY')
                        iconImgEl.src = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
                        tempP.textContent = 'Temp: ' + data.list[i].main.temp + '°F'
                        windP.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH'
                        humidityP.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %'

                        var eachForecastDiv = document.createElement('div')
                        fivedayWrapperDiv.appendChild(eachForecastDiv)

                        //Append elements created to the parent element
                        eachForecastDiv.append(dateEl, iconImgEl, tempP, windP, humidityP)

                        //Style each day div elements
                        eachForecastDiv.setAttribute('style', 'border: solid; margin: 1%;  background-color: rgb(4, 4, 43); color: white; padding: 0 1%; ')
                        iconImgEl.setAttribute('style', 'width: 30px; height:30px')

                        //Add class to each day div element
                        eachForecastDiv.classList.add('eachForecast-items')
                    }

                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

//Save the city names previously searched by the user and add event listener to them 
function saveHistory() {
    //Get the value of the city from local storage and assign it to the variable
    var historyData = JSON.parse(localStorage.getItem('cities')) || []
    var city = userCity.value.trim()
    if (historyData.indexOf(city) === -1) {
        historyData.push(city)
    }

    //Save the user data in the local storage
    localStorage.setItem('cities', JSON.stringify(historyData))

    //Select the DOM element and initialize its value empty
    var historyDiv = document.getElementById('search-history')
    historyDiv.textContent = ''

    //Itirate over the length of the saved data in the local storage 
    for (var i = 0; i < historyData.length; i++) {

        //Create a history search button element and assign the indexed city name to it 
        var historyButton = document.createElement('button')
        historyButton.textContent = historyData[i]

        //Add the event listener to the history search button to help users has access of past search
        historyButton.addEventListener('click', function () {
            var historyCity = this.textContent
            userCity.value = historyCity

            cityNameDiv.innerHTML = ''
            fivedayWrapperDiv.innerHTML = ''
            //Call a function that display the weather forecast
            displayForecast()

        })
        historyButton.classList.add('historyBtn-size')
        historyDiv.appendChild(historyButton)
    }

}




