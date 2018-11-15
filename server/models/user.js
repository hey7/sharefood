var mysqlHelper = require("./mysqlHelper");

function User(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.password = user.password;
    this.phone = user.phone;
    this.photo = user.photo;
    this.sex = user.sex;
    this.signature = user.signature;
    this.state = user.state;
    this.create_time = user.create_time;
    this.modified_time = user.modified_time;
};

//保存用户
User.prototype.save = function save(callback) {
    var sql = "INSERT INTO user(user_id,username,password,photo,state,create_time,modified_time) VALUES(0,?,?,?,?,?,?)";
    let params = [this.username, this.password,this.photo,this.state,this.create_time,this.modified_time]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}

//查询username为xxx的有多少个
User.getUserNumByName = function getUserNumByName(username, callback) {
    var sql = "SELECT COUNT(1) AS num FROM user WHERE username = ?";
    let params = [username]
    mysqlHelper.single(sql, params, function (err, result) {
        callback(err, result);
    })
}

//根据UserName查询User
User.getUserByUserName = function getUserByUserName(username, callback) {
    let sql = "SELECT * FROM user WHERE username = ?";
    let params = [username]
    mysqlHelper.single(sql, params, function (err, result) {
        callback(err, result);
    })
}

module.exports = User;