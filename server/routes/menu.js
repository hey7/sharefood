var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    Menu = require('../models/menu'),
    Menu_pic = require('../models/menu_pic'),
    util = require('../util/util') //公共函数
//200 其他错
//201 上传图片成功
//202 保存菜单成功

//上传图片
router.post('/imgUpload', function (req, res) {
    //uploadModel.uploadPhoto(req, 'upload/menu', function (err, fields, uploadPath) {
    uploadModel.uploadPhoto(req, config.upload_menu_pic_path, function (err, fields, uploadPath) {
        if (err) {
            res.json({
                code: 200,
                data: '',
                msg: err
            })
            return;
        }
        res.json({
            code: 201,
            data: {
                fields: fields, //表单中字段信息
                uploadPath: uploadPath //上传图片的相对路径
            },
            msg: '上传图片成功'
        })
    });
});

router.post('/createMenu', function (req, res) {
    var menuname = req.body['menuname'],
        chengpintu = JSON.parse(req.body['chengpintu']),
        descript = req.body['descript'],
        type = JSON.parse(req.body['type']),
        groups = JSON.parse(req.body['groups']),
        steps = JSON.parse(req.body['steps']),
        trick = req.body['trick'],
        iscreate = req.body['iscreate'],
        state = req.body['state'],

        user_id = req.cookies.user_id,
        love = 0,
        collection = 0,
        weekcollection = 0,
        create_time = util.getNowFormatDate(),
        modified_time = util.getNowFormatDate()
   
    var menu = new Menu({
        user_id: user_id,
        menuname: menuname,
        iscreate: iscreate,
        love: love,
        trick: trick,
        descript: descript,
        state: state,
        collection: collection,
        weekcollection: weekcollection,
        create_time: create_time,
        modified_time: modified_time,
    });

    //保存菜单
    var aa = new Promise(function (resolve, reject) {
        menu.save(function (err, result) {
            if (err) {
                res.json({
                    code: 200,
                    data: '',
                    msg: err
                })
                return;
            }
            if (result.insertId > 0) {
                resolve(result.insertId)
                return;
            }
        });
    }).then(function (menu_id) {
        
        // for(var item of chengpintu){
        //     console.log(item)
        // }
       
    })


});
module.exports = router;