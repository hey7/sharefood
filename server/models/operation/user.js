var mysqlHelper = require("../mysqlHelper");

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

//查询username为xxx的有多少个
User.getUserNumByName = function getUserNumByName(username) {
    var sql = "SELECT COUNT(1) AS num FROM user WHERE username = ?";
    let params = [username]
    return mysqlHelper.single1(sql, params)
}

//保存用户
User.prototype.save = function save() {
    var sql = "INSERT INTO user(user_id,username,password,phone,photo,sex,signature,state,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?)";
    let params = [this.username, this.password,this.phone,this.photo,this.sex,this.signature,this.state,this.create_time,this.modified_time]
    return mysqlHelper.execute1(sql, params)
}

//根据UserName查询User
User.getUserByUserName = function getUserByUserName(username) {
    let sql = "SELECT * FROM user WHERE username = ?";
    let params = [username]
    return mysqlHelper.single1(sql, params)
}

//根据UserId查询User
User.getUserByUserId = function getUserByUserId(user_id) {
    let sql = "SELECT * FROM user WHERE user_id = ?";
    let params = [user_id]
    return mysqlHelper.single1(sql, params)
}

//更新User
User.prototype.updateUserByUserId = function updateUserByUserId() {
    let sql = "UPDATE user SET phone = ?,photo = ?,sex = ?,signature = ?,modified_time = ? WHERE user_id = ?";
    let params = [this.phone,this.photo,this.sex,this.signature,this.modified_time,this.user_id]
    return mysqlHelper.execute1(sql, params)
}

//修改密码
User.prototype.updataPassword = function updataPassword() {
    let sql = "UPDATE user SET password = ?,modified_time = ? WHERE user_id = ?";
    let params = [this.password,this.modified_time,this.user_id]
    return mysqlHelper.execute1(sql, params)
}

// //保存用户
// User.prototype.save = function save(callback) {
//     var sql = "INSERT INTO user(user_id,username,password,phone,photo,sex,signature,state,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?)";
//     let params = [this.username, this.password,this.phone,this.photo,this.sex,this.signature,this.state,this.create_time,this.modified_time]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

// //查询username为xxx的有多少个
// User.getUserNumByName = function getUserNumByName(username, callback) {
//     var sql = "SELECT COUNT(1) AS num FROM user WHERE username = ?";
//     let params = [username]
//     mysqlHelper.single(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

// //根据UserName查询User
// User.getUserByUserName = function getUserByUserName(username, callback) {
//     let sql = "SELECT * FROM user WHERE username = ?";
//     let params = [username]
//     mysqlHelper.single(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }




module.exports = User;