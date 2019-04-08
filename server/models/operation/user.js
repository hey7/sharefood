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
    this.ban = user.ban;
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
    var sql = "INSERT INTO user(user_id,username,password,phone,photo,sex,signature,state,ban,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?,?)";
    let params = [this.username, this.password, this.phone, this.photo, this.sex, this.signature, this.state, this.ban, this.create_time, this.modified_time]
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
    let params = [this.phone, this.photo, this.sex, this.signature, this.modified_time, this.user_id]
    return mysqlHelper.execute1(sql, params)
}

//修改密码
User.prototype.updataPassword = function updataPassword() {
    let sql = "UPDATE user SET password = ?,modified_time = ? WHERE user_id = ?";
    let params = [this.password, this.modified_time, this.user_id]
    return mysqlHelper.execute1(sql, params)
}

//查询用户(条件、分页)
User.searchUser = function searchUser(user, Param) {
    let sql = "SELECT * FROM `user` WHERE state = 0 ";
    let params = []
    if (user.user_id != null && user.user_id != '') {
        sql = sql + 'AND user_id=? '
        params.push(user.user_id)
    }
    if (user.username != null && user.username != '') {
        sql = sql + 'AND username=? '
        params.push(user.username)
    }
    if (user.ban != null && user.ban != '') {
        sql = sql + 'AND ban=? '
        params.push(user.ban)
    }
    sql = sql + 'limit ?, ?'

    params.push((Param.pageNum - 1) * Param.pageSize)
    params.push(Param.pageSize)
    return mysqlHelper.execute1(sql, params)
}

//查询用户总页数(条件)
User.searchUserCount = function searchUserCount(user) {
    let sql = "SELECT COUNT(*) AS count FROM `user` WHERE state = 0 ";
    let params = []
    if (user.user_id != null && user.user_id != '') {
        sql = sql + 'AND user_id=? '
        params.push(user.user_id)
    }
    if (user.username != null && user.username != '') {
        sql = sql + 'AND username=? '
        params.push(user.username)
    }
    if (user.ban != null && user.ban != '') {
        sql = sql + 'AND ban=? '
        params.push(user.ban)
    }
    return mysqlHelper.single1(sql, params)
}

//更改状态
User.prototype.updataBan = function updataBan() {
    let sql = "UPDATE user SET ban = ?,modified_time = ? WHERE user_id = ?";
    let params = [this.ban, this.modified_time, this.user_id]
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