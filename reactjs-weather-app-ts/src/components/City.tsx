import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import './City.css'
import 'bootstrap/dist/css/bootstrap.css';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
const City = (props: any) => {
    const location = useLocation();
    const country = location.state;
    const [capital, setCapital] = useState<String>("");
    const [population, setPop] = useState<String>("");
    const [flag, setFlag] = useState<any>();
    const [lat, setLat] = useState<number>();
    const [lng, setLng] = useState<number>();  
    const [displayName, setDisplay] = useState<String>();
    useEffect(() => {
        async function getData() {
            const resultSet = await axios.get(`https://restcountries.com/v3/name/${country.name}`);
            const data = resultSet.data[0];
            setDisplay(data.name.official);
            setCapital(data.capital);
            setPop(data.population);
            setFlag(data.flags[0]);
            setLat(data.latlng[0]);
            setLng(data.latlng[1]);
           
        }
        if (country.name)
            getData();
    })


  return (
      <div className='country-search'>
          <div className='flag'><img src={flag} /></div>
          <div className="country">Country Name: {displayName}</div>
        <div className='pop'>Population: {population}</div>
          <div className='latitude'>Latitude: {lat}</div>
        <div className='long'>Longitude: {lng}</div>
        <div className='weatherbutton'><button className='btn btn-info'><Link to="/Weather" state={{city:capital}}><LocationSearchingIcon/></Link> </button></div>
    </div>
  )
}

export default City