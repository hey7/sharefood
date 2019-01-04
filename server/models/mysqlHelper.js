var config = require('./config');
var mysql = require('mysql');
var cfg = config.mysql;
var pool = mysql.createPool({
    connectionLimit: 50,
    host: cfg.host, //主机
    user: cfg.user, //MySQL认证用户名
    password: cfg.pwd,
    port: cfg.port,
    database: cfg.db,
    multipleStatements: true //是否允许执行多条sql语句
});

pool.on('connection', function (connection) {
    console.log("已连接")
    connection.query('SET SESSION auto_increment_increment=1');
});


////////////////////////异步/////////////////////////////////
//返回单个查询结果
module.exports.single = (sql, params, cb) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            cb(err, null)
            return;
        }
        connection.query(sql, params, function (err, res) {
            connection.release();
            if (err) {
                cb(err, null)
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
        connection.query(sql, params, function (err, res) {
            connection.release();
            if (err) {
                cb(err, null)
                return;
            }
            cb(null, res);
        });
    });
}



////////////////////////同步//////////////////////////////////
//返回单个查询结果
module.exports.single1 = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            }
            connection.query(sql, params, (err, res) => {
                connection.release();
                if (err) {
                    reject(err)
                } else {
                    resolve(res[0])
                }
            });
        });

    })
}

//执行代码，返回执行结果(增删改)
module.exports.execute1 = (sql, params, cb) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            }
            connection.query(sql, params, (err, res) => {
                connection.release();
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        });
    })
}