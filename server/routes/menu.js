var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    util = require('../util/util'), //公共函数

    Menu = require('../models/operation/menu'),
    Menu_pic = require('../models/operation/menu_pic'),
    Ingredient = require('../models/operation/ingredient')
Menu_ingredient = require('../models/operation/menu_ingredient')
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


    new Promise(function (resolve, reject) { //保存菜谱
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
    }).then(function (menu_id) { //保存菜谱图(成品图和步骤)
        for (let item of chengpintu) { //成品图
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item,
                step: 0
            })
            menu_pic.save(function (err, result) {
                if (err) {
                    res.json({
                        code: 200,
                        data: '',
                        msg: err
                    })
                    return;
                }
                if (result.insertId > 0) {
                    return;
                }
            })
        }

        for (let [index, item] of steps.entries()) { //步骤
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item.path,
                step: index + 1,
                descript: item.descript
            })
            menu_pic.save(function (err, result) {
                if (err) {
                    res.json({
                        code: 200,
                        data: '',
                        msg: err
                    })
                    return;
                }
                if (result.insertId > 0) {
                    return;
                }
            })
        }

        //保存食材
        for (let group of groups) {
            for (let ingredient of group.ingredient) {
                new Promise(function (resolve, reject) { //食材中有没有，没有存，有取，取ingredient_id
                    Ingredient.getIngredientByIngredientName(ingredient.ingredientname, function (err, result) {
                        if (err) {
                            res.json({
                                code: 200,
                                data: '',
                                msg: err
                            })
                            return;
                        }
                        
                        if (!result) { //食材中没有，存
                            var ingredient1 = new Ingredient({
                                ingredientname: ingredient.ingredientname,
                                state: 0
                            })
                            ingredient1.save(function (err, result) {
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
                                }

                            });
                        } else { //食材中有
                            resolve(result.ingredient_id)
                        }

                    })
                }).then(function (ingredient_id) { //菜谱_食材保存
                    var menu_ingredient = new Menu_ingredient({
                        menu_id: menu_id,
                        ingredient_id: ingredient_id,
                        groupname: group.groupname,
                        amount: ingredient.amount
                    })
                    menu_ingredient.save(function (err, result) {
                        if (err) {
                            res.json({
                                code: 200,
                                data: '',
                                msg: err
                            })
                            return;
                        }
                        if (result.insertId > 0) {
                            return;
                        }
                    })
                })
            }
        }



    })




});
module.exports = router;