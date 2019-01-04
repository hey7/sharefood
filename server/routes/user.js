var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数
    config = require('../util/config'), //公共配置
    crypto = require('crypto'), //加密

    User = require('../models/operation/user')

//100: 其他错
//101: 用户名已存在
//999: 注册成功，请登录
//103：用户不存在
//104：用户名或密码有误
//999：登录成功
//999：获得用户成功

//注册
router.post('/register', async function (req, res) {
    var username = req.body['username'],
        password = req.body['password'],
        state = "0",
        photo = config.default_user_photo,
        create_time = util.getNowFormatDate(),
        modified_time = util.getNowFormatDate();

    //加密
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var user = new User({
        username: username,
        password: password,
        state: state,
        photo: photo,
        create_time: create_time,
        modified_time: modified_time
    });

    try {
        var result;

        //检查用户名是否已经存在
        result = await User.getUserNumByName(user.username)
        if (result != null && result.num > 0) {
            res.json({
                code: 101,
                data: '',
                msg: '用户名已存在'
            })
            return;
        }

        // 注册
        result = await user.save()
        if (result.insertId > 0) {
            res.json({
                code: 999,
                data: '',
                msg: '注册成功，请登录'
            })
            return;
        }

    } catch (err) {
        res.json({
            code: 100,
            data: '',
            msg: err
        })
        return;
    }
});

//登录
router.post('/login', async function (req, res) {
    var username = req.body['username'],
        password = req.body['password']

    //加密
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    try {
        var result;

        //检查用户名是否已经存在
        result = await User.getUserByUserName(username)
        if (result == null) {
            res.json({
                code: 103,
                data: '',
                msg: '用户不存在'
            })
            return;
        }
        if (result.username != username || result.password != password) {
            res.json({
                code: 104,
                data: '',
                msg: '用户名或密码有误'
            })
            return;
        }

        res.json({
            code: 999,
            data: result,
            msg: '登录成功'
        })

    } catch (err) {
        res.json({
            code: 100,
            data: '',
            msg: err
        })
        return;
    }
});


// //注册
// router.post('/register', function (req, res) {
//     var username = req.body['username'],
//         password = req.body['password'],
//         state = "0",
//         photo = config.default_user_photo,
//         create_time = util.getNowFormatDate(),
//         modified_time = util.getNowFormatDate();

//     //加密
//     var md5 = crypto.createHash('md5');
//     password = md5.update(password).digest('hex');

//     var user = new User({
//         username: username,
//         password: password,
//         state: state,
//         photo: photo,
//         create_time: create_time,
//         modified_time: modified_time
//     });

//     //检查用户名是否已经存在
//     User.getUserNumByName(user.username, function (err, results) {
//         if (err) {
//             res.json({
//                 code: 100,
//                 data: '',
//                 msg: err
//             })
//             return;
//         }
//         if (results != null && results.num > 0) {
//             res.json({
//                 code: 101,
//                 data: '',
//                 msg: '用户名已存在'
//             })
//             return;
//         }


//         //注册
//         user.save(function (err, result) {
//             if (err) {
//                 res.json({
//                     code: 100,
//                     data: '',
//                     msg: err
//                 })
//                 return;
//             }

//             if (result.insertId > 0) {
//                 res.json({
//                     code: 999,
//                     data: '',
//                     msg: '注册成功，请登录'
//                 })
//                 return;
//             }

//         });

//     });

// });


// //登录
// router.post('/login', function (req, res) {
//     var username = req.body['username'],
//         password = req.body['password']

//     //加密
//     var md5 = crypto.createHash('md5');
//     password = md5.update(password).digest('hex');

//     //检查用户名是否已经存在
//     User.getUserByUserName(username, function (err, results) {
//         if (err) {
//             res.json({
//                 code: 100,
//                 data: '',
//                 msg: err
//             })
//             return;
//         }
//         if (results == null) {
//             res.json({
//                 code: 103,
//                 data: '',
//                 msg: '用户不存在'
//             })
//             return;
//         }
//         if (results.username != username || results.password != password) {
//             console.log(results.password, "==", password)
//             res.json({
//                 code: 104,
//                 data: '',
//                 msg: '用户名或密码有误'
//             })
//             return;
//         }

//         res.cookie('username', results.username, { //7天登录状态
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });
//         res.cookie('user_id', results.user_id, {
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

//         res.json({
//             code: 105,
//             data: {
//                 username: results.username
//             },
//             msg: '登录成功'
//         })
//     });
// });

// //通过用户名，得到用户信息 用于vuex
// router.post('/getUser', function (req, res) {
//     var username = req.body['username'];
//     User.getUserByUserName(username, function (err, results) {
//         if (err) {
//             res.json({
//                 code: 100,
//                 data: '',
//                 msg: err
//             })
//             return;
//         }
//         res.json({
//             code: 106,
//             data: results,
//             msg: '获得用户成功'
//         })
//     });
// });




module.exports = router;