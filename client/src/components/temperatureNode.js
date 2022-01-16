const Lampotila = (props) => {
  let d = props.time ? (new Date(props.time)).toLocaleString() : 'Ei kirjattu lämpötiloja'

  return (
    <div className={props.time ? 'lampotila' : 'ei-kirjauksia'}>
      <p>Device Id: {props.id}</p>
      <p>Temperature: {props.temperature}</p>
      <p>Last log: {d}</p>
    </div>
  )
}

  export default Lampotila