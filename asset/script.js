console.log("'I'm connected'")

var myKey = '34e81c1188d1e55fbd1d99bde32f6e18'

var searchButton = document.getElementById('search-btn')




// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))



// fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))



searchButton.addEventListener('click', function(event){
    event.preventDefault()
    var userCity = document.querySelector ('input[name ="city-input"]')
    console.log(userCity.value)
    var city =userCity.value;


 fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + myKey)
.then(res => res.json())
.then(data => {console.log(data)

console.log(city.name)
    var lat = data[0].lat
    var lon = data[0].lon


    // var apiUrl =
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + myKey)
    .then(res => res.json())
    .then(data => {console.log(data)

    var par = document.createElement('p')
    par.textContent = 'temp:' + data.list[0].main.temp
    var tempEl = document.getElementById('city-now')
    tempEl.appendChild(par)

    console.log(par)
    console.log(data.list[0].weather[0].icon)
    console.log(data.list[0].main.humidity)
    console.log(data.list[0].wind.speed)
    })

})
   

            
displayForecast()
saveHistory()
})

function displayForecast (){
   
    console.log('forecast function') 
    
}

function saveHistory(){
    console.log('save history function')
   
}




