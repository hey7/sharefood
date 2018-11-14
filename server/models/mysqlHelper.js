var config = require('./config');
var mysql = require('mysql');
var cfg = config.mysql;
var pool = mysql.createPool({
    connectionLimit: 50,
    host: cfg.host,       //主机
    user: cfg.user,       //MySQL认证用户名
    password: cfg.pwd,
    port: cfg.port,
    database: cfg.db,
    multipleStatements: true  //是否允许执行多条sql语句
});

pool.on('connection', function (connection) {
    console.log("已连接")
    connection.query('SET SESSION auto_increment_increment=1');
});

//将结果已对象数组返回
module.exports.row = function (sql, params, cb) {
    pool.getConnection(function (err, connection) {
        if (err) {
            cb(err, null)
            return;
        }
        connection.query(sql, params, function (error, res) {
            connection.release();
            if (error) {
                cb(error, null)
                return;
            }
            cb(null, res)
        });
    });
}
//返回一个对象
module.exports.first = function (sql, params, cb) {
    pool.getConnection(function (err, connection) {
        if (err) {
            cb(err, null)
            return;
        }
        connection.query(sql, params, function (error, res) {
            connection.release();
            cb(error, res);
        });
    });
}

//返回单个查询结果
module.exports.single = (sql, params, cb) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            cb(err, null)
            return;
        }
        connection.query(sql, params, function (error, res) {
            connection.release();
            if (error) {
                cb(error, null)
                return;
            }
            cb(null, res[0]);
        });
    });
}
//执行代码，返回执行结果(增删改)
module.exports.execute = (sql, params, cb) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            cb(err, null)
            return;
        }
        connection.query(sql, params, function (error, res) {
            connection.release();
            if (error) {
                cb(error, null)
                return;
            }
            cb(null, res);
        });
    });
}
