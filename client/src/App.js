import React, { useState, useEffect } from 'react'
import './styles/app.css'
import tempService from './services/service'
import OhjeetNew from './components/instructions-new'
import LampotilatContainer from './components/temperatureContainer'

const App = () => {
  const [temps, setTemps] = useState([])

  useEffect(() => {
    tempService
      .getAll()
      .then(response => {
        setTemps(response.data.sort(function(a,b) {return a.deviceID - b.deviceID}))
      })
  }, [])

  return (
    <div className="App">
      <LampotilatContainer temps={temps}/>
      <OhjeetNew/>
    </div>
  );
}
//poistettu <Ohjeet/> 24.01.2022 ties-testipalvelinta varten

export default App;
