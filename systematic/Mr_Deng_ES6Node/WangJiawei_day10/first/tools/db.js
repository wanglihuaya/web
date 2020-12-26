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
      connection.query(sql, arr, (err, result, fields) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
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
console.log(options);
module.exports = db;
