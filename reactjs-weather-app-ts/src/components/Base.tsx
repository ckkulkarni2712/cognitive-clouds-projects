import React, { ChangeEvent, useEffect, useState } from 'react'
import './Base.css';
import axios from 'axios';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import 'bootstrap/dist/css/bootstrap.css';
//url = http://api.weatherstack.com/current?access_key=99e37fe6e124f7e75194e549743d368c&query={capital}
const Base = ():JSX.Element => {
    const [name, setName] = useState<String>("");
    const [capital, setCapital] = useState<String>("");
    const [population, setPop] = useState<String>("");
    const [search, setSearch] = useState<String>('');
    const [flag, setFlag] = useState<any>();
    const [lat, setLat] = useState<number>();
    const [lng, setLng] = useState<number>();
    const [temp, setTemp] = useState<any>();
    const [icon, setIcon] = useState<any>();
    const [description, setDesc] = useState<String>();
    const [pres, setPres] = useState<any>();
    const [humid, setHumid] = useState<any>();
    const [precip, setPrecip] = useState<any>();
    const [show, setShow] = useState<Boolean>(false);
    useEffect(() => {
        async function getData() {
            // Country API Call
            const resultSet = await axios.get(`https://restcountries.com/v3/name/${search}`);

            const data = resultSet.data[0];
            
            setName(data.name.official);
            setCapital(data.capital);
            setPop(data.population);
            setFlag(data.flags[0]);
            setLat(data.latlng[0]);
            setLng(data.latlng[1]);
//Weather API Call: 
            const weatherData = await axios.get(`http://api.weatherstack.com/current?access_key=99e37fe6e124f7e75194e549743d368c&query=${capital}`)

            const currentWeather = weatherData.data.current;
            
            setTemp(currentWeather.temperature);
            setIcon(currentWeather.weather_icons);
            setDesc(currentWeather.weather_descriptions);
            setPres(currentWeather.pressure);
            setHumid(currentWeather.humidity);
            setPrecip(currentWeather.precip);
        }
        getData();
    },[search])
    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const find = () => {
        if (name !== '')    setSearch(name);
        setName("");
    }

  return (
      <div className='data'>
          <div className='country_search'>
                <div className='img'><img src={flag} /></div>
                <div className='name'>Name: {name}</div>      
                <div className='capital'>Capital: {capital}</div>
                <div className='population'>Population: {population}</div>
                <div className='latitude'>Latitude: {lat}</div>
                <div className='long'>Longitude: {lng}</div>
              <div className='input-group'>
                  
                  <input type="text" onChange={searchData}
                      className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                
              </div>
              
              <div className='showdata'>
              <button onClick={find} disabled={name.length<1 }><TravelExploreIcon/></button>
              </div>
              
          </div>
          <div className='weather_report'>

                    <div className='city'>City: {capital}</div>
                    <div className='temp'>Temperature: {temp}°C</div>
                    <div className='icon'><img src={icon}/></div>
                    <div className='descr'>Description: {description}</div>
                    <div className='pressure'>Pressure: {pres}</div>
                    <div className='humid'>Humidity: {humid}</div>
                    <div className='rain'>Precipitation: {precip}%</div>
              
          </div>
    </div>
  )
}

export default Base