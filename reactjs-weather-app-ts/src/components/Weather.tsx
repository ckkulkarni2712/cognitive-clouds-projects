import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Weather.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Weather = (props: any) => {
    const location = useLocation();
    const capital = location.state;
    console.log(capital.city);
    const [temp, setTemp] = useState<any>();
    const [weathericon, setIcon] = useState<any>();
    const [description, setDesc] = useState<String>();
    const [pres, setPres] = useState<any>();
    const [humid, setHumid] = useState<any>();
    const [precip, setPrecip] = useState<any>();
    useEffect(() => {
        async function getData() {
            const resultSet = await axios.get(`http://api.weatherapi.com/v1/current.json?key=2378c58bc7984bdeb83144256230202&q=${capital.city}&aqi=no`)
            setTemp(resultSet.data.current.temp_c);
            setIcon(resultSet.data.current.condition.icon);
            setDesc(resultSet.data.current.condition.text);
            setPres(resultSet.data.current.pressure_mb);
            setHumid(resultSet.data.current.humidity);
            setPrecip(resultSet.data.current.precip_mm);
        }
        if (capital.city)
            getData()
    })
  return (
      <div className='weather_display'>
        <div className='city'>City: {capital.city}</div>
                    <div className='temp'>Temperature: {temp}°C</div>
                    <div className='icon'><img src={weathericon}/></div>
                    <div className='descr'>Description: {description}</div>
                    <div className='pressure'>Pressure: {pres}</div>
                    <div className='humid'>Humidity: {humid}</div>
                    <div className='rain'>Precipitation: {precip}%</div>
          <button>
              <Link to="/">
                  <ArrowBackIcon />
              </Link>
        </button>



    </div>
  )
}

export default Weather