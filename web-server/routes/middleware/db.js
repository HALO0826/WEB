import mysql from 'mysql'

const  conn = mysql.createConnection({
    host: '127.0.0.1', // 数据库的地址
    user: 'root', // 账号
    password: 'zyq20000826', // 密码
    database: 'web_shop', // 数据库名称
    multipleStatements: true,  // 允许多条sql同时查询
});

conn.connect();

module.exports= conn;