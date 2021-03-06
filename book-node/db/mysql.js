const mysql = require('mysql')

// 创建数据库连接
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '112233',
  port: '3306',
  database: 'staffdb',
})
// 开始连接
conn.connect()

//执行SQL的函数
function exec(sql, params) {
  const promise = new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = exec
