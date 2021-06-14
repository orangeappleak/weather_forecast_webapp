import './App.css';

import {useEffect,useState} from 'react';

function App() {

  var API_KEY = "bb2a11b6a50b40398a6103316211406";

  const [weatherInfo, setweatherInfo] = useState();
  const [gotData, updateGotData] = useState(false);
  const [url , updateUrl ] = useState(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=delhi&days=7&aqi=no&alerts=no`)

  useEffect(() => {
    fetch(url)
    .then(data => {return data.json()})
    .then(res => {
      setweatherInfo(res)
      updateGotData(true);
      console.log(res);
    })
  },[url]);



  return (
    <div className="App" id="main-page">
      <div id="background">
        <img alt="" src="https://images.unsplash.com/photo-1584559759045-d5062ca44f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1548&q=80"/>
      </div>
      <div id="headings">
        <h1>Hello There.</h1>
        <h2>Welcome to a minimal and simple weather forecast app,Search for a specific city's weather in the provided seach field.</h2>
      </div>
      <div id="weather-info">
        <div id="search-bar">
          <form>
            <input id="city-name" type="text"></input>
            <div id="button" onClick={() => {
              updateGotData(false);
              var input_text = document.getElementById("city-name").value;
              if(input_text === ""){
                alert("please enter a valid city name")
              }
              else{
                updateUrl(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input_text}&days=7&aqi=no&alerts=no`);
              }
            }}>Search</div>
          </form>
        </div>
        {gotData ? 
        <div id="weather-details">
          <WeatherInfo info={weatherInfo.current} comingDays={weatherInfo.forecast.forecastday}  cityName = {weatherInfo.location.name} countryName = {weatherInfo.location.country}/>
        </div>
        
        : <p style={{
          fontSize: "90px",
          color: "orange",
          fontFamily: "Open Sans",
          fontWeight: "800"
        }}>Fetching</p>}
      </div>
    </div>
  );
}


function WeatherInfo(data){
  console.log(data);
  return(
    <div id="inner-weather-details">
    <div id="current-day-weather">
      <h1>Weather in {data.cityName},<span style={{
          color: "black",
          fontSize: '22px',
          fontWeight: '800'
        }}>{data.countryName}</span></h1>
        <h2>Current temp in is <span id="value">{data.info.temp_c} C / {data.info.temp_f} F</span></h2>
        <h2>Wind Speed is <span id="value">{data.info.wind_kph} kmph / {data.info.wind_mph} MPH</span></h2>
        <h2>Wind Direction is <span id="value">{data.info.wind_dir}</span></h2>
        <h2>It Feels like <span id="value">{data.info.feelslike_c} C / {data.info.feelslike_f} F</span></h2>
        <div id="condition">
          <h2>The weather condition is going to be <span id="value">{data.info.condition.text}</span></h2>
          <img alt="" src={data.info.condition.icon} />
        </div>
    </div>
    <div id="weather-for-coming-days">
        <h1>Weather for next 3 days</h1>
        {data.comingDays.map(el => {
          return <div id="next-day-weather">
            <h3 style={{
              color: "black",
              opacity: "0.7",
              textDecoration: "underline",
            }} id="date">The weather for {el.date}</h3>
            <div id="next-day-weather-details"> 
              <h2>The max temp is going to be <span id="value">{el.day.maxtemp_c} C / {el.day.maxtemp_f} F</span></h2>
              <h2>The min temp is going to be <span id="value">{el.day.mintemp_c} C / {el.day.mintemp_f} F</span></h2>
              <h2>The max wind speed is going to be <span id="value">{el.day.maxwind_kph} KPH / {el.day.maxwind_mph} MPH</span></h2>
              <h2>The average humidity is going to be <span id="value">{el.day.avghumidity}</span></h2>
              <div id="condition">
                  <h2>The weather condition is likely going to be <span id="value">{el.day.condition.text}</span></h2>
                  <img alt="" src={el.day.condition.icon} />
              </div>
            </div>
          </div>
        })}
    </div>
      
    </div>
  )
}

function updateInfo(){
  var cityName = document.getElementById("city-name").innerText;
  console.log(cityName);
}

export default App;
