import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/latestbyid'


const getAll = () => {
    return axios.get(baseUrl)
  }
  
const service = {
  getAll
}

export default service
