let mysql = require("mysql");
let options = require("./dbconfig.js");
class Db{
  constructor({host="localhost",user="root",password="",port="3306",database}){
    this.options = {
      host,
      user,
      password,
      port,
      database     
    }
    this.connection = null;
  }
  // 创建连接
  initConn(){
    let conn = mysql.createConnection(this.options);
    this.connection = conn; //把连接对象备份
    return new Promise((resolve,reject)=>{
        conn.connect((err)=>{
          if(!err){
            resolve(conn);//如果能够连接数据库成功，resolve连接对象本身
          }else{
            reject(err);
          }
        })
    })
  }
  // 执行curd操作的
  async query(sql,arr=[]){
    let connection = await this.initConn();
    return new Promise((resolve,reject)=>{
      connection.query(sql,arr,(err,result,fields)=>{
        if(!err){
          // resolve([null,result]);
          resolve( result )
        }else{
          reject(err);
          // resolve([err]);
        }
      })
    })
  }
  // 关闭连接，释放资源
  close(){
    this.connection.end();
  }
}
let db = new Db(options);
// 相当于
// let {host,user,password,port,database} = options
module.exports = db;