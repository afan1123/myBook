var express = require('express')
var router = express.Router()
const staffCon = require('../controller/staff')

router.get('/staff', async function (req, res, next) {
  const data = await staffCon.query()
  console.log(data)
  res.send(data)
})

router.post('/staff/update', async (req, res, next) => {
  const data = await staffCon.update(req)
  res.send(data)
})
module.exports = router
