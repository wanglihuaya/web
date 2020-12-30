let options = require("./dbconfig");
let mysql = require("mysql");

class Db {
  constructor({
    host = "localhost",
    user = "root",
    password = "11111111",
    port = 3306,
    database,
  }) {
    this.options = {
      host,
      user,
      password,
      port,
      database,
    };
    this.connection = null;
  }
  //create connection
  initConn() {
    let conn = mysql.createConnection(this.options);

    this.connection = conn; //make connection object backup

    return new Promise((resolve, reject) => {
      conn.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn); //if connection was successful, resolve connection object
        }
      });
    });
  }

  //do curd Operation
  async query(sql, arr = []) {
    let connection = await this.initConn();
    return new Promise((resolve, reject) => {
      connection.query(sql, arr, (err, result) => {
        if (!err) {
          resolve([null, result]);
        } else {
          // reject(err);
          resolve([err]); //为了提示报错信息，如数据库出错，控制台会报错
        }
      });
    });
  }

  //close connection , release resources
  close() {
    this.connection.end();
  }
}

let db = new Db(options);
module.exports = db;
