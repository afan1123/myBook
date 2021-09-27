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

// // 设置跨域
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*') //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header('Access-Control-Allow-Headers', 'content-type') //允许的header类型
//   res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS') //跨域允许的请求方式
//   if (req.method.toLowerCase() == 'options') res.send(200)
//   //让options尝试请求快速结束
//   else next()
// })

app.use('/', staffRouter)

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001')
})
