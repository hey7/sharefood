var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    util = require('../util/util'), //公共函数
    crypto = require('crypto') //加密

//100:其他错
//101:用户名已存在
//102:注册成功，请登录
router.post('/register', function (req, res) {
    var username = req.body['username'],
        password = req.body['password'],
        state = "0",
        create_time = util.getNowFormatDate(),
        modified_time = util.getNowFormatDate();

    //加密
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var user = new User({
        username: username,
        password: password,
        state: state,
        create_time: create_time,
        modified_time: modified_time
    });


    //检查用户名是否已经存在
    User.getUserNumByName(user.username, function (err, results) {
        if (err) {
            res.json({code:100,data: '',msg: err})
            return;
        } 
        if (results != null && results[0]['num'] > 0) {
            res.json({code:101,data: '',msg: '用户名已存在'})
            return;
        }
        
        //注册
        user.save(function (err, result) {
            if (err) {
                res.json({code:100,data: '',msg: err})
                return;
            }

            if (result.insertId > 0) {
                res.json({code:102,data: '',msg: '注册成功，请登录'})
                return;
            }

        });

    });
});

module.exports = router;