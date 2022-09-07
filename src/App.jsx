import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'

function App() {
  const [weather, setWeather] = useState()
  const [coords, setCoords] = useState()
  useEffect(() => {

    const success = pos=>{
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  
  
  
  return (
    <div className='App'  >
      <CardWeather lat={coords?.lat} lon={coords?.lon}  weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App
