import React, { useState, useEffect } from 'react'
import './app.css'
import kuva from './images/kytkenta.jpg'
import noteService from './services/service'

const App = () => {
/*   const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
        console.log(response.data)
      })
  }, []) */

  return (
    <div className="App">
      <p>1. <a href='https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup' >Mittarin ohjeet</a></p>
      <p>Kytkentäkaavio:</p>
      <img src={kuva}></img>
      <p>2. <a href='https://docs.python-requests.org/en/latest/' >Python requests</a></p>
      <p>Get polkuja:<br/>/api/temperatures<br/>/api/latestbyid<br/><br/>
      Post polku:<br/>/api/posttemperature<br/><br/>
	    Muotoa:
	    <br/><br/>
      {'{'}<br/>
		  <pre>   "temp": float,<br/></pre>
		  <pre>   "apikey": string,<br/></pre>
		  <pre>   "deviceId": int<br/></pre>
      {'}'}<br/><br/>
      Datan pitää olla json muodossa!</p>
    </div>
  );
}

export default App;
