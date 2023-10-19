// src/Home.js
import React from 'react';
import { useAuth } from './AuthProvider';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState({});
  const [location, setLocation] = useState(''); 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5b95a02a485aeac208d8d76da4d283f8`;
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    }
  }

  // Use the useEffect hook to load the weather for Colombo when the component mounts
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Colombo&units=imperial&appid=5b95a02a485aeac208d8d76da4d283f8`;
    axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
         <div className="App">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          onKeyPress={searchLocation}
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='discription'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != undefined &&
         <div className='bottom'>
         <div className='feels'>
           {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
           <p>Feels like</p>
         </div>
         <div className='humidity'>
         {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}
           <p>Humidity</p>
         </div>
         <div className='wind'>
         {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
           <p>Wind Speed</p>
         </div>
       </div>
       }

       <div >
        <button className='view-more-button'>View More</button>
        </div>
       
       </div>
    </div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          
          <p>You are not logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
