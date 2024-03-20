const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'honda@1805',
    database: 'code_editor',
  });

module.exports=connection