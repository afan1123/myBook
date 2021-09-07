var express = require('express')
var router = express.Router()
const staffCon = require('../controller/staff')
/* GET home page. */
router.get('/staff', async function (req, res, next) {
  let data = await staffCon.query()
  res.send(data)
})

module.exports = router
