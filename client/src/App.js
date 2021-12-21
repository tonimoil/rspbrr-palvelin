import React, { useState, useEffect } from 'react'
import './styles/app.css'
import noteService from './services/service'
import Ohjeet from './components/instructions'
import LampotilatContainer from './components/temperatureContainer'

const App = () => {
  const [temps, setTemps] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setTemps(response.data.sort(function(a,b) {return a._id - b._id}))
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
