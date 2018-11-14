var mysqlHelper = require("./mysqlHelper");

function User(user) {
    this.username = user.username;
    this.password = user.password;
};


User.prototype.save = function save(callback) {
    var sql = "INSERT INTO user(userid,username,password) VALUES(0,?,?)";
    let params = [this.username, this.password]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}

User.getUserNumByName = function getUserNumByName(username, callback) {
    var sql = "SELECT COUNT(1) AS num FROM user WHERE username = ?";
    let params = [username]
    mysqlHelper.row(sql, params, function (err, result) {
        callback(err, result);
    })
}

User.getUserByUserName = function getUserByUserName(username, callback) {
    let sql = "SELECT * FROM user WHERE username = ?";
    let params = [username]
    mysqlHelper.row(sql, params, function (err, result) {
        callback(err, result);
    })
}

module.exports = User;