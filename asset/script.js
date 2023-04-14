console.log("'I'm connected'")

var myKey = '34e81c1188d1e55fbd1d99bde32f6e18'

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))



// fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=' + myKey)
// .then(res => res.json())
// .then(data => console.log(data))

var searchButton = document.getElementById('search-btn')

searchButton.addEventListener('click', function(event){
    event.preventDefault()
    var userCity = document.querySelector ('input[name ="city-input"]')
    console.log(userCity.value)
    var city =userCity.value;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + myKey)
.then(res => res.json())
.then(data => console.log(data))


displayForecast()
saveHistory()
})

function displayForecast (){
    
    console.log('forecast function') 
    
}

function saveHistory(){
    console.log('save history function')
   
}




