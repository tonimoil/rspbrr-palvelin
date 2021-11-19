import React, { useState, useEffect } from 'react'
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
      <p>testi</p>
    </div>
  );
}

export default App;
