var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  console.log(res)
  res.render('index', { title: 'Express' })
})

module.exports = router
