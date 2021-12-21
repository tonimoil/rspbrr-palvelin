import axios from 'axios'

const baseUrl = '/api/latestbyid'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
const service = {
  getAll
}

export default service
