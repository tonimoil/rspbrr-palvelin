import axios from 'axios'

const baseUrl = 'https://rspbrr-palvelin.herokuapp.com/api/latestbyid'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
const service = {
  getAll
}

export default service
