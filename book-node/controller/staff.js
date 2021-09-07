const exec = require('../db/mysql')

//添加数据
const add = (staff) => {
  const sql = 'insert into basicInfo(name,age) values(?,?)'
  const params = [staff.name, staff.age]
  return exec(sql, params).then(() => {
    return query()
  })
}

//查询
const query = () => {
  const sql = 'select * from basicInfo'
  return exec(sql).then((data) => {
    return data
  })
}

//修改
const update = (staff) => {
  const sql = 'update basicInfo set name=?,age=? where id=?'
  const params = [staff.name, staff.age, staff.id]
  return exec(sql, params).then((data) => {
    return {
      row: data.affectedRows,
    }
  })
}

//删除
const del = (id) => {
  const sql = 'delete from basicInfo where id=?'
  const params = [id]
  return exec(sql, params).then((data) => {
    // return {
    //   row: data.affectedRows
    // }
    return query()
  })
}

module.exports = {
  add,
  query,
  update,
  del,
}
