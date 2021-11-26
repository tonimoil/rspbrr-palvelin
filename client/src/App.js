import React, { useState, useEffect } from 'react'
import './app.css'
//import kuva from './images/kytkenta.jpg'
import noteService from './services/service'

const Ohjeet = () => {
  return (
    <div>
    <p>1. Projektin alustaminen</p>
    <p>Koneelle on asennettu seuraavat työkalut/ohjelmat:</p>
    <ul>
      <li>Python3</li>
      <li><a href="https://pypi.org/project/pip/">pip</a><ul><li> "pip is the package installer for Python. You can use pip to install packages from the <a href="https://pypi.org/"> Python Package Index </a> and other indexes"</li></ul></li>
      <li><a href="https://docs.python.org/3/library/venv.html">Virtual environment tai venv</a><ul><li>Tärkeää esim. riippuvuuksien hallinnassa</li></ul></li>
      <li>Visual studio code<ul><li>Koodieditori</li></ul></li>
    </ul>
    <p>Näiden työkalujen avulla perustamme projektin tämän päivän työpajaa varten. </p>
    <p>2. <a href='https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup' >Mittarin ohjeet</a></p>
    <p>Kytkentäkaavio:</p>
    <p>3. <a href='https://docs.python-requests.org/en/latest/' >Python requests</a></p>
    <div>Get polkuja:<br/>/api/temperatures<br/>/api/latestbyid<br/><br/>
    Post polku:<br/>/api/posttemperature<br/><br/>
    Muotoa:
    <br/><br/>
    {'{'}<br/>
    <pre>   "temp": float,<br/></pre>
    <pre>   "apikey": string,<br/></pre>
    <pre>   "deviceId": int<br/></pre>
    {'}'}<br/><br/>
    Datan pitää olla json muodossa!</div>
  </div>
  )
}

const Lampotila = (props) => {
  var d = (new Date(props.time)).toLocaleString()

  return (
    <div className="lampotila">
      <p>Device Id: {props.id}</p>
      <p>Temperature: {props.temperature}</p>
      <p>Last log: {d}</p>
    </div>
  )
}

const LampotilatContainer = (props) => {
  return (
    <div className="lampotilaContainer">
      {props.temps.map(a => <Lampotila key={a._id} temperature={a.temperature} time={a.latest} id={a._id}/>)}
    </div>
  )
}

const App = () => {
  const [temps, setTemps] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setTemps(response.data)
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
