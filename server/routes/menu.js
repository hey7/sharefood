var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    util = require('../util/util'), //公共函数

    Menu = require('../models/operation/menu'),
    Menu_pic = require('../models/operation/menu_pic'),
    Ingredient = require('../models/operation/ingredient'),
    Menu_ingredient = require('../models/operation/menu_ingredient'),
    Menu_type = require('../models/operation/menu_type')

//200 其他错
//999 上传图片成功
//999 保存菜谱成功
//999 获得菜谱成功
//999 删除菜谱成功
//999 查询菜谱详情成功

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
            code: 999,
            data: {
                fields: fields, //表单中字段信息
                uploadPath: uploadPath //上传图片的相对路径
            },
            msg: '上传图片成功'
        })
    });
});
//获取详细菜谱
router.post('/getdetailMenu', async function (req, res) {
    var user_id = JSON.parse(req.cookies.user).user_id
    var menu_id = req.body['menu_id'];

    var data = {
        menuname: '', //
        chengpintu: [],
        descript: '', //
        type: {},
        groups: {},
        steps: [],
        trick: '', //
        iscreate: '', //
        state: '' //
    }

    try {
        var result;

        result = await Menu.getMenuByMenuId(menu_id)
        data.menuname = result.menuname
        data.descript = result.descript
        data.trick = result.trick
        data.iscreate = result.iscreate
        data.state = result.state

        result = await Menu_type.getMenuTypeByMenuId(menu_id)
        console.log(result)
        for (var row of result) {
            if (data.type[row.top_id]) {
                if (data.type[row.top_id] instanceof Array) {
                    data.type[row.top_id].push({groupname: row.type,ingredientname: row.name})
                } else {
                    var aar = [];
                    aar.push(data.type[row.top_id])
                    aar.push({groupname: row.type,ingredientname: row.name})
                    data.type[row.top_id] = aar
                }
            } else {
                data.type[row.top_id] = [{groupname: row.type,ingredientname: row.name}]
            }
        }
        result = await Menu_ingredient.getMenuIngredientByMenuId(menu_id)
        
        for (var row of result) {
            if (data.groups[row.groupnum]) {
                if (data.groups[row.groupnum] instanceof Array) {
                    data.groups[row.groupnum].push({groupname: row.groupname,ingredientname: row.ingredientname, amount: row.amount})
                } else {
                    var aar = [];
                    aar.push(data.groups[row.groupnum])
                    aar.push({groupname: row.groupname,ingredientname: row.ingredientname, amount: row.amount})
                    data.groups[row.groupnum] = aar
                }
            } else {
                data.groups[row.groupnum] = [{groupname: row.groupname,ingredientname: row.ingredientname, amount: row.amount}]
            }
        }
        console.log(data.groups)
        res.json({
            code: 999,
            data: data,
            msg: '查询菜谱详情成功'
        })

    } catch (err) {
        res.json({
            code: 200,
            data: '',
            msg: err
        })
        return;
    }


});

//保存菜谱
router.post('/createMenu', async function (req, res) {
    var menuname = req.body['menuname'],
        chengpintu = JSON.parse(req.body['chengpintu']),
        descript = req.body['descript'],
        type = JSON.parse(req.body['type']),
        groups = JSON.parse(req.body['groups']),
        steps = JSON.parse(req.body['steps']),
        trick = req.body['trick'],
        iscreate = req.body['iscreate'],
        state = req.body['state'],

        user_id = JSON.parse(req.cookies.user).user_id,
        love = 0,
        collection = 0,
        weekcollection = 0,
        create_time = util.getNowFormatDate(),
        modified_time = util.getNowFormatDate()


    var dictionary_ids = [];
    for (let item in type) {
        if (type[item] instanceof Array) {
            dictionary_ids = dictionary_ids.concat(type[item])
        } else {
            dictionary_ids.push(type[item])
        }
    }

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
    try {
        var result;
        var menu_id;
        var ingredient_id;

        //保存菜谱
        result = await menu.save()
        if (result.insertId > 0) {
            menu_id = result.insertId
        }

        //成品图
        for (let item of chengpintu) {
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item,
                step: 0
            })
            await menu_pic.save()
        }

        //步骤
        for (let [index, item] of steps.entries()) {
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item.path,
                step: index + 1,
                descript: item.descript
            })
            await menu_pic.save()
        }

        //保存食材
        for (let [index, group] of groups.entries()) {
            for (let ingredient of group.ingredient) {
                //食材中有没有，没有存，有取，取ingredient_id
                result = await Ingredient.getIngredientByIngredientName(ingredient.ingredientname)

                if (!result) { //食材中没有，存
                    var ingredient1 = new Ingredient({
                        ingredientname: ingredient.ingredientname,
                        state: 0
                    })
                    result = await ingredient1.save(function (err, result) {
                        if (result.insertId > 0) {
                            ingredient_id = result.insertId
                        }
                    });
                } else { //食材中有
                    ingredient_id = result.ingredient_id
                }

                var menu_ingredient = new Menu_ingredient({
                    menu_id: menu_id,
                    ingredient_id: ingredient_id,
                    groupname: group.groupname,
                    groupnum: index,
                    amount: ingredient.amount
                })
                await menu_ingredient.save()

            }
        }

        for (let dictionary_id of dictionary_ids) { //保存分类
            var menu_type = new Menu_type({
                menu_id: menu_id,
                dictionary_id: dictionary_id
            })
            await menu_type.save()
        }

        res.json({
            code: 999,
            data: '',
            msg: '保存菜谱成功'
        })

    } catch (err) {
        res.json({
            code: 200,
            data: '',
            msg: err
        })
        return;
    }

});

//删除用户的菜谱
router.post('/deleteMenu', async function (req, res) {
    var menu_id = req.body['menu_id']

    try {
        var result;

        result = await Menu.deleteMenuByMenuId(menu_id)
        res.json({
            code: 999,
            data: '',
            msg: '删除菜谱成功'
        })

    } catch (err) {
        res.json({
            code: 200,
            data: '',
            msg: err
        })
        return;
    }


});

//获得用户的菜谱(第一张成品图、点赞、收藏、修改日期)
router.post('/getMenu', async function (req, res) {
    var user_id = JSON.parse(req.cookies.user).user_id

    try {
        var result;

        result = await Menu.getMenuByUserId(user_id)

        res.json({
            code: 999,
            data: result,
            msg: '获得菜谱成功'
        })
        return;

    } catch (err) {
        res.json({
            code: 200,
            data: '',
            msg: err
        })
        return;
    }
});

// //保存菜谱
// router.post('/createMenu', function (req, res) {
//     var menuname = req.body['menuname'],
//         chengpintu = JSON.parse(req.body['chengpintu']),
//         descript = req.body['descript'],
//         type = JSON.parse(req.body['type']),
//         groups = JSON.parse(req.body['groups']),
//         steps = JSON.parse(req.body['steps']),
//         trick = req.body['trick'],
//         iscreate = req.body['iscreate'],
//         state = req.body['state'],

//         user_id = req.cookies.user_id,
//         love = 0,
//         collection = 0,
//         weekcollection = 0,
//         create_time = util.getNowFormatDate(),
//         modified_time = util.getNowFormatDate()


//     var dictionary_ids = [];
//     for (let item in type) {
//         if (type[item] instanceof Array) {
//             dictionary_ids = dictionary_ids.concat(type[item])
//         } else {
//             dictionary_ids.push(type[item])
//         }
//     }

//     var menu = new Menu({
//         user_id: user_id,
//         menuname: menuname,
//         iscreate: iscreate,
//         love: love,
//         trick: trick,
//         descript: descript,
//         state: state,
//         collection: collection,
//         weekcollection: weekcollection,
//         create_time: create_time,
//         modified_time: modified_time,
//     });


//     new Promise(function (resolve, reject) { //保存菜谱
//         menu.save(function (err, result) {
//             if (err) {
//                 res.json({
//                     code: 200,
//                     data: '',
//                     msg: err
//                 })
//                 return;
//             }
//             if (result.insertId > 0) {
//                 resolve(result.insertId)
//                 return;
//             }
//         });
//     }).then(function (menu_id) { //保存菜谱图(成品图和步骤)
//         for (let item of chengpintu) { //成品图
//             var menu_pic = new Menu_pic({
//                 menu_id: menu_id,
//                 path: item,
//                 step: 0
//             })
//             menu_pic.save(function (err, result) {
//                 if (err) {
//                     res.json({
//                         code: 200,
//                         data: '',
//                         msg: err
//                     })
//                     return;
//                 }
//                 if (result.insertId > 0) {
//                     return;
//                 }
//             })
//         }

//         for (let [index, item] of steps.entries()) { //步骤
//             var menu_pic = new Menu_pic({
//                 menu_id: menu_id,
//                 path: item.path,
//                 step: index + 1,
//                 descript: item.descript
//             })
//             menu_pic.save(function (err, result) {
//                 if (err) {
//                     res.json({
//                         code: 200,
//                         data: '',
//                         msg: err
//                     })
//                     return;
//                 }
//                 if (result.insertId > 0) {
//                     return;
//                 }
//             })
//         }

//         for (let [index, group] of groups.entries()) { //保存食材
//             for (let ingredient of group.ingredient) {
//                 new Promise(function (resolve, reject) { //食材中有没有，没有存，有取，取ingredient_id
//                     Ingredient.getIngredientByIngredientName(ingredient.ingredientname, function (err, result) {
//                         if (err) {
//                             res.json({
//                                 code: 200,
//                                 data: '',
//                                 msg: err
//                             })
//                             return;
//                         }

//                         if (!result) { //食材中没有，存
//                             var ingredient1 = new Ingredient({
//                                 ingredientname: ingredient.ingredientname,
//                                 state: 0
//                             })
//                             ingredient1.save(function (err, result) {
//                                 if (err) {
//                                     res.json({
//                                         code: 200,
//                                         data: '',
//                                         msg: err
//                                     })
//                                     return;
//                                 }
//                                 if (result.insertId > 0) {
//                                     resolve(result.insertId)
//                                 }

//                             });
//                         } else { //食材中有
//                             resolve(result.ingredient_id)
//                         }

//                     })
//                 }).then(function (ingredient_id) { //菜谱_食材保存
//                     var menu_ingredient = new Menu_ingredient({
//                         menu_id: menu_id,
//                         ingredient_id: ingredient_id,
//                         groupname: group.groupname,
//                         groupnum: index,
//                         amount: ingredient.amount
//                     })
//                     menu_ingredient.save(function (err, result) {
//                         if (err) {
//                             res.json({
//                                 code: 200,
//                                 data: '',
//                                 msg: err
//                             })
//                             return;
//                         }
//                         if (result.insertId > 0) {
//                             return;
//                         }
//                     })
//                 })
//             }
//         }

//         for (let dictionary_id of dictionary_ids) { //保存分类
//             var menu_type = new Menu_type({
//                 menu_id: menu_id,
//                 dictionary_id: dictionary_id
//             })
//             menu_type.save(function (err, result) {
//                 if (err) {
//                     res.json({
//                         code: 200,
//                         data: '',
//                         msg: err
//                     })
//                     return;
//                 }
//                 if (result.insertId > 0) {
//                     return;
//                 }
//             })

//         }
//     })

// });

// //获得用户的菜谱(第一张成品图、点赞、收藏、修改日期)
// router.post('/getMenu', function (req, res) {
//     var user_id = req.cookies.user_id
//     Menu.getMenuByUserId(user_id, function (err, results) {
//         if (err) {
//             res.json({
//                 code: 100,
//                 data: '',
//                 msg: err
//             })
//             return;
//         }
//         res.json({
//             code: 203,
//             data: results,
//             msg: '获得菜谱成功'
//         })
//     });
// });

// //删除用户的菜谱
// router.post('/deleteMenu', function (req, res) {
//     var menu_id = req.body['menu_id']
//     console.log('menu_id', menu_id)
//     Menu.deleteMenuByMenuId(menu_id, function (err, results) {
//         if (err) {
//             res.json({
//                 code: 200,
//                 data: '',
//                 msg: err
//             })
//             return;
//         }
//         res.json({
//             code: 203,
//             data: '',
//             msg: '删除菜谱成功'
//         })
//     });
// });


module.exports = router;