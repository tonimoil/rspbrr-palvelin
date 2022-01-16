import React, { useState, useEffect } from 'react'
import './styles/app.css'
import tempService from './services/service'
import Ohjeet from './components/instructions'
import LampotilatContainer from './components/temperatureContainer'

const App = () => {
  const [temps, setTemps] = useState([])

  useEffect(() => {
    tempService
      .getAll()
      .then(response => {
        console.log(response)
        setTemps(response.data.sort(function(a,b) {return a.deviceID - b.deviceID}))
      })
  }, [])

  return (
    <div className="App">
      <LampotilatContainer temps={temps}/>
      <Ohjeet/>
    </div>
  );
}

export default App;
