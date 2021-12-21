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

  export default Lampotila