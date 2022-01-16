import axios from 'axios'

const baseUrl = '/api/temp/latestbyid'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
const service = {
  getAll
}

export default service
