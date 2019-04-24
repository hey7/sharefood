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

//保存用户
User.prototype.save = function save() {
    var sql = "INSERT INTO user(user_id,username,password,phone,photo,sex,signature,state,ban,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?,?)";
    let params = [this.username, this.password, this.phone, this.photo, this.sex, this.signature, this.state, this.ban, this.create_time, this.modified_time]
    return mysqlHelper.execute1(sql, params)
}

//更新User
User.prototype.updateUserByUserId = function updateUserByUserId() {
    let sql = "UPDATE user SET modified_time = ? ";
    let params = []
    params.push(this.modified_time)
    if (this.phone != null && this.phone != '') {
        sql = sql + ', phone = ? '
        params.push(this.phone)
    }
    if (this.photo != null && this.photo != '') {
        sql = sql + ', photo = ? '
        params.push(this.photo)
    }
    if (this.sex != null && this.sex != '') {
        sql = sql + ', sex = ? '
        params.push(this.sex)
    }
    if (this.signature != null && this.signature != '') {
        sql = sql + ', signature = ? '
        params.push(this.signature)
    }
    if (this.password != null && this.password != '') {
        sql = sql + ', password = ? '
        params.push(this.password)
    }
    if (this.ban != null && this.ban != '') {
        sql = sql + ', ban = ? '
        params.push(this.ban)
    }
    sql = sql + 'WHERE user_id = ?'
    params.push(this.user_id)

    return mysqlHelper.execute1(sql, params)
}


//查询用户(条件、分页)
User.searchUser = function searchUser(user, Param) {
    let sql = "SELECT * FROM `user` WHERE 1=1 ";
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
    if (user.state != null && user.state != '') {
        sql = sql + 'AND state=? '
        params.push(user.state)
    }
    if (Param != null && Param != '') {
        sql = sql + 'limit ?, ?'
        params.push((Param.pageNum - 1) * Param.pageSize)
        params.push(Param.pageSize)
    }
    return mysqlHelper.execute1(sql, params)
}

//查询用户总页数(条件)
User.searchUserCount = function searchUserCount(user) {
    let sql = "SELECT COUNT(*) AS count FROM `user` WHERE 1=1 ";
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
    if (user.state != null && user.state != '') {
        sql = sql + 'AND state=? '
        params.push(user.state)
    }
    return mysqlHelper.single1(sql, params)
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