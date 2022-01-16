import Lampotila from './temperatureNode'

const LampotilatContainer = (props) => {
  console.log(props.temps)
    return (
      <div className="lampotilaContainer">
        {props.temps.map(a => <Lampotila key={a.deviceID} temperature={a.temp} time={a.date} id={a.deviceID}/>)}
      </div>
    )
  }

export default LampotilatContainer