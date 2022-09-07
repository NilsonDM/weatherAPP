import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const CardWeather = ({lat, lon, weather, setWeather}) => {
    
  
    
    const [temperture, setTemperture] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(lat){
            const APIKey = '86506c4f9f664dbf8a5d9dae6626ec2b'
            const URL= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)
            .then(res=> {
                setWeather(res.data)
                const temp = {
                    celsius: `${Math.round(res.data.main.temp - 273.15)}°C`,
                    farenheit: `${Math.round((res.data.main.temp - 273.15)* 9/5+32)}°F`
                }

                setTemperture(temp)
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
        }

    }, [lat,lon])
    
    console.log(weather);


    const changeTemp = ()=> setIsCelsius(!isCelsius)

    



    if (isLoading) {
        return <Loading/>
        
    }else{
        return (
            <div className='container'>

                <div className='cardWeather' >
                    <h1>{weather?.name} {weather?.sys.country}</h1>
                    <h3>{weather?.weather[0].description}</h3>
                    <div className='icon-temp'>

                        <img src={weather && ` http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png` }alt="weather image"/>
                        <div className='temp'>{isCelsius ? temperture?.celsius : temperture?.farenheit}</div> 
                    </div>
                    <div className='info'>
                        
                        <div>Humidity: {weather?.main.humidity}</div>
                        <div>Wind: {weather?.wind.speed}</div>
                        <div>Pressure: {weather?.main.pressure}</div>
                        
                    </div>
                    <div className='button' ><button onClick={changeTemp}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button></div>
                    
            
                </div>
            </div>
      )

    }
}

export default CardWeather
