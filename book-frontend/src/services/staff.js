import http from './http.js'
async function fetchStaff() {
  return await http.get('/staff').then(({ data }) => {
    return data
  })
}
async function modifyStaff(staff) {
  return await http.post('/staff/update', staff).then(({ data }) => {
    console.log(data)
    return data
  })
}
export default { fetchStaff, modifyStaff }
