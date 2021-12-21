import Lampotila from './temperatureNode'

const LampotilatContainer = (props) => {
    return (
      <div className="lampotilaContainer">
        {props.temps.map(a => <Lampotila key={a._id} temperature={a.temperature} time={a.latest} id={a._id}/>)}
      </div>
    )
  }

export default LampotilatContainer