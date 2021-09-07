import axios from './http.js'
async function fetchStaff() {
  return await axios.get('/staff').then(({ data }) => {
    return data
  })
}
export default { fetchStaff }
