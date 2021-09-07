var express = require('express')
// var path = require('path');

// const exphbs = require('express-handlebars');
// const commentsCon = require('./controller/commentsController');

var app = express()

const staffRouter = require('./routes/staff')

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) ////数据JSON类型
app.use(express.urlencoded({ extended: false })) //解析post请求数据
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
    'Content-Type': 'application/json; charset=utf-8',
  })
  next()
})

app.use('/', staffRouter)

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})
