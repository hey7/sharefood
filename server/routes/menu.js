var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    util = require('../util/util'), //公共函数

    Menu = require('../models/operation/menu'),
    Menu_pic = require('../models/operation/menu_pic'),
    Ingredient = require('../models/operation/ingredient'),
    Menu_ingredient = require('../models/operation/menu_ingredient'),
    Menu_type = require('../models/operation/menu_type'),

    Love = require('../models/operation/love'),
    Collection = require('../models/operation/collection')

//200 其他错
//999 上传图片成功
//999 保存菜谱成功
//999 获得菜谱成功
//999 删除菜谱成功
//999 查询菜谱详情成功
//999 查询成功
//999 审核成功

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

    try {
        var result;
        var menu_id;
        var ingredient_id;

        //保存菜谱
        var menu = new Menu({
            user_id: user_id,
            menuname: menuname,
            iscreate: iscreate,
            trick: trick,
            descript: descript,
            state: state,
            create_time: create_time,
            modified_time: modified_time,
        });
        result = await menu.save()
        if (result.insertId > 0) {
            menu_id = result.insertId
        }

        //成品图
        for (let item of chengpintu) {
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item.url,
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
                result = await Ingredient.searchIngredient(
                    new Ingredient({
                        ingredientname: ingredient.ingredientname
                    }), '')
                result = result[0]

                var ingredient_id


                if (!result) { //食材中没有，存
                    var ingredient1 = new Ingredient({
                        ingredientname: ingredient.ingredientname,
                        state: 0,
                        create_time: util.getNowFormatDate(),
                        modified_time: util.getNowFormatDate()
                    })
                    result = await ingredient1.save();

                    if (result.insertId > 0) {
                        ingredient_id = result.insertId
                    }

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
                dictionary_id: dictionary_id,
                state: 0
            })
            await menu_type.save()
        }

        res.json({
            code: 999,
            data: '',
            msg: '发布菜谱成功'
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



//获取详细菜谱
router.post('/getdetailMenu', async function (req, res) {
    var menu_id = req.body['menu_id'];

    var data = {
        menuname: '',
        chengpintu: [],
        descript: '',
        type: {},
        groups: {},
        steps: [],
        trick: '',
        iscreate: '',
        state: ''
    }

    try {
        var result;

        //获取菜谱
        result = await Menu.getMenuByMenuId(menu_id)
        data.menuname = result.menuname
        data.descript = result.descript
        data.trick = result.trick
        data.iscreate = result.iscreate
        data.state = result.state

        //获取菜谱分类
        result = await Menu_type.getMenuTypeByMenuId(menu_id, 0)
        for (var row of result) {
            if (data.type[row.top_id]) {
                if (data.type[row.top_id] instanceof Array) {
                    data.type[row.top_id].push({
                        type: row.type,
                        name: row.name
                    })
                } else {
                    var aar = [];
                    aar.push(data.type[row.top_id])
                    aar.push({
                        type: row.type,
                        name: row.name
                    })
                    data.type[row.top_id] = aar
                }
            } else {
                data.type[row.top_id] = [{
                    type: row.type,
                    name: row.name
                }]
            }
        }



        //获取菜谱食材
        result = await Menu_ingredient.getMenuIngredientByMenuId(menu_id)
        for (var row of result) {
            if (data.groups[row.groupname]) {
                if (data.groups[row.groupname] instanceof Array) {
                    data.groups[row.groupname].push({
                        ingredient_id: row.ingredient_id,
                        ingredientname: row.ingredientname,
                        amount: row.amount,
                        state: row.state
                    })
                } else {
                    var aar = [];
                    aar.push(data.groups[row.groupname])
                    aar.push({
                        ingredient_id: row.ingredient_id,
                        ingredientname: row.ingredientname,
                        amount: row.amount,
                        state: row.state
                    })
                    data.groups[row.groupname] = aar
                }
            } else {
                data.groups[row.groupname] = [{
                    ingredient_id: row.ingredient_id,
                    ingredientname: row.ingredientname,
                    amount: row.amount,
                    state: row.state
                }]
            }
        }

        var arr = []
        for (var i in data.groups) {
            arr.push({
                groupname: i,
                ingredient: data.groups[i]
            })
        }
        data.groups = arr;

        //获取菜谱成品图
        result = await Menu_pic.getMenuPicByMenuId(menu_id);
        for (var row of result) {
            data.chengpintu.push({
                url: row.path
            })
        }

        //获取菜谱步骤
        result = await Menu_pic.getMenuStepByMenuId(menu_id);
        for (var row of result) {
            data.steps.push({
                path: row.path,
                descript: row.descript
            })
        }

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

//获得点赞，收藏，userId,username等基本信息
router.post('/getInfoOfMenu', async function (req, res) {
    var menu_id = req.body['menu_id'],
        user_id = JSON.parse(req.cookies.user).user_id

    try {
        var result

        result = await Love.getLoveNum(new Love({
            user_id: user_id,
            any_id: menu_id,
            state: "0",
        }))
        var alreadyLoveShow = (result.num) > 0 ? true : false


        result = await Collection.getCollectionNum(new Collection({
            user_id: user_id,
            any_id: menu_id,
            state: "0",
        }))
        var alreadyCollectionShow = (result.num) > 0 ? true : false

        result = await Love.getLoveNum(new Love({
            any_id: menu_id,
            state: "0",
        }))
        var loveNum = result.num

        result = await Collection.getCollectionNum(new Collection({
            any_id: menu_id,
            state: "0",
        }))
        var collectionNum = result.num

        result = await Menu.getMenuInfoByMenuId(menu_id)
        var user_id = result.user_id
        var username = result.username

        res.json({
            code: 999,
            data: {
                alreadyLoveShow: alreadyLoveShow,
                alreadyCollectionShow: alreadyCollectionShow,
                loveNum: loveNum,
                collectionNum: collectionNum,
                user_id: user_id,
                username: username
            },
            msg: '查询成功'
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



//删除用户的菜谱(菜谱改状态)
router.post('/deleteMenu', async function (req, res) {
    var menu_id = req.body['menu_id'],
        modified_time = util.getNowFormatDate()

    try {
        var menu = new Menu({
            menu_id: menu_id,
            state: "6",
            modified_time: modified_time,
        });

        var result = await menu.update()

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

//获取详细菜谱(用于编辑)
router.post('/getdetailMenuByedit', async function (req, res) {
    var menu_id = req.body['menu_id'];

    var data = {
        menuname: '',
        chengpintu: [],
        descript: '',
        type: {},
        groups: {},
        steps: [],
        trick: '',
        iscreate: '',
        state: ''
    }

    try {
        var result;

        //获取菜谱
        result = await Menu.getMenuByMenuId(menu_id)
        data.menuname = result.menuname
        data.descript = result.descript
        data.trick = result.trick
        data.iscreate = result.iscreate
        data.state = result.state

        //获取菜谱分类
        result = await Menu_type.getMenuTypeByMenuId(menu_id, 0)
        var arr = [];
        for (var row of result) {
            switch (row.type) {
                case "难度":
                    data.type.nandu = row.dictionary_id
                    break;
                case "口味":
                    data.type.kouwei = row.dictionary_id
                    break;
                case "工艺":
                    data.type.gongyi = row.dictionary_id
                    break;
                case "耗时":
                    data.type.haoshi = row.dictionary_id
                    break;
                case "厨具":
                    arr.push(row.dictionary_id)
                    break;
            }
        }
        data.type.chujv = arr


        //获取菜谱食材
        result = await Menu_ingredient.getMenuIngredientByMenuId(menu_id)
        for (var row of result) {
            if (data.groups[row.groupname]) {
                if (data.groups[row.groupname] instanceof Array) {
                    data.groups[row.groupname].push({
                        ingredientname: row.ingredientname,
                        amount: row.amount
                    })
                } else {
                    var aar = [];
                    aar.push(data.groups[row.groupname])
                    aar.push({
                        ingredientname: row.ingredientname,
                        amount: row.amount
                    })
                    data.groups[row.groupname] = aar
                }
            } else {
                data.groups[row.groupname] = [{
                    ingredientname: row.ingredientname,
                    amount: row.amount
                }]
            }
        }

        var arr = []
        for (var i in data.groups) {
            arr.push({
                groupname: i,
                ingredient: data.groups[i]
            })
        }
        data.groups = arr;

        //获取菜谱成品图
        result = await Menu_pic.getMenuPicByMenuId(menu_id);
        for (var row of result) {
            data.chengpintu.push({
                url: row.path
            })
        }

        //获取菜谱步骤
        result = await Menu_pic.getMenuStepByMenuId(menu_id);
        for (var row of result) {
            data.steps.push({
                path: row.path,
                descript: row.descript
            })
        }

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

//编辑菜谱（菜谱修改，菜谱图、菜谱食材、菜谱分类删除重加）
router.post('/editMenu', async function (req, res) {
    var menu_id = req.body['menu_id'],
        menuname = req.body['menuname'],
        chengpintu = JSON.parse(req.body['chengpintu']),
        descript = req.body['descript'],
        type = JSON.parse(req.body['type']),
        groups = JSON.parse(req.body['groups']),
        steps = JSON.parse(req.body['steps']),
        trick = req.body['trick'],
        iscreate = req.body['iscreate'],
        state = req.body['state'],

        user_id = JSON.parse(req.cookies.user).user_id,
        modified_time = util.getNowFormatDate()


    var dictionary_ids = [];
    for (let item in type) {
        if (type[item] instanceof Array) {
            dictionary_ids = dictionary_ids.concat(type[item])
        } else {
            dictionary_ids.push(type[item])
        }
    }

    try {
        var result;

        //保存菜谱
        var menu = new Menu({
            menu_id: menu_id,
            user_id: user_id,
            menuname: menuname,
            iscreate: iscreate,
            trick: trick,
            descript: descript,
            state: state,
            modified_time: modified_time,
        });
        result = await menu.update()

        result = await Menu_pic.deleteMenuPicByMenuId(menu_id);
        // 成品图
        for (let item of chengpintu) {
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item.url,
                step: 0
            })
            await menu_pic.save()
        }

        // 步骤
        for (let [index, item] of steps.entries()) {
            var menu_pic = new Menu_pic({
                menu_id: menu_id,
                path: item.path,
                step: index + 1,
                descript: item.descript
            })
            await menu_pic.save()
        }

        result = await Menu_ingredient.deleteMenuIngredientByMenuId(menu_id);
        // 保存食材
        for (let [index, group] of groups.entries()) {
            for (let ingredient of group.ingredient) {
                //食材中有没有，没有存，有取，取ingredient_id
                result = await Ingredient.searchIngredient(
                    new Ingredient({
                        ingredientname: ingredient.ingredientname
                    }), '')
                result = result[0]

                var ingredient_id

                if (!result) { //食材中没有，存
                    var ingredient1 = new Ingredient({
                        ingredientname: ingredient.ingredientname,
                        state: 0
                    })
                    result = await ingredient1.save();
                    if (result.insertId > 0) {
                        ingredient_id = result.insertId
                    }

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

        result = await Menu_type.deleteMenuTypeByMenuId(menu_id, 0)

        for (let dictionary_id of dictionary_ids) { //保存分类
            var menu_type = new Menu_type({
                menu_id: menu_id,
                dictionary_id: dictionary_id,
                state: 0
            })
            await menu_type.save()
        }

        res.json({
            code: 999,
            data: '',
            msg: '菜谱编辑成功'
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



//首页展示的3类菜谱（最新，一种收藏最多，总共收藏最多）
router.post('/getMenuIndexShow', async function (req, res) {
    try {
        var result1 = await Menu.getNewMenu()
        var result2 = await Menu.getOneWeekMenu()
        var result3 = await Menu.getPopularMenu()

        res.json({
            code: 999,
            data: {
                menu1: result1,
                menu2: result2,
                menu3: result3
            },
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


//菜谱首页用于种类查找
router.post('/getAllMenuByType', async function (req, res) {
    var type = JSON.parse(req.body['type'])
    try {
        var result = await Menu.searchMenuBytype(type)

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


//查询已审核完的自己的菜谱
router.post('/searchMenuBychecked', async function (req, res) {
    var user_id = JSON.parse(req.cookies.user).user_id

    try {
        var result = await Menu.searchMenuBychecked(user_id)

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
/////////////////////////
//查询菜谱（条件查询）
router.post('/searchMenuBycondition', async function (req, res) {
    var menu_id = req.body['menu_id'],
        menuname = req.body['menuname'],
        username = req.body['username'],
        user_id = req.body['user_id'],
        state = req.body['state'],
        mParam = JSON.parse(req.body['mParam'])

    var menu = new Menu({
        menu_id: menu_id,
        user_id: user_id,
        menuname: menuname,
        state: state
    });

    try {
        var result1 = await Menu.searchMenuCount(menu, username)
        var result = await Menu.searchMenu(menu, username, mParam)
        res.json({
            code: 999,
            data: result,
            total: result1.count,
            msg: '查询成功'
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

//获取详细菜谱
router.post('/searchMenu', async function (req, res) {
    var menu_id = req.body['menu_id'];

    var data = {
        menu: '',
        chengpintu: [],
        type: {},
        groups: {},
        steps: [],
        tags: []
    }

    try {
        var result;

        //获取菜谱
        result = await Menu.getMenuInfoByMenuId(menu_id)
        data.menu = result

        //获取菜谱分类
        result = await Menu_type.getMenuTypeByMenuId(menu_id, 0)
        for (var row of result) {
            if (data.type[row.top_id]) {
                if (data.type[row.top_id] instanceof Array) {
                    data.type[row.top_id].push({
                        type: row.type,
                        name: row.name
                    })
                } else {
                    var aar = [];
                    aar.push(data.type[row.top_id])
                    aar.push({
                        type: row.type,
                        name: row.name
                    })
                    data.type[row.top_id] = aar
                }
            } else {
                data.type[row.top_id] = [{
                    type: row.type,
                    name: row.name
                }]
            }
        }

        //获取菜谱分类
        result = await Menu_type.getMenuTypeByMenuId(menu_id, 1)
        for (var row of result) {
            data.tags.push({
                value: row.dictionary_id,
                label: row.name,
                type: ""
            })
        }

        //获取菜谱食材
        result = await Menu_ingredient.getMenuIngredientByMenuId(menu_id)
        for (var row of result) {
            if (data.groups[row.groupname]) {
                if (data.groups[row.groupname] instanceof Array) {
                    data.groups[row.groupname].push({
                        ingredientname: row.ingredientname,
                        amount: row.amount
                    })
                } else {
                    var aar = [];
                    aar.push(data.groups[row.groupname])
                    aar.push({
                        ingredientname: row.ingredientname,
                        amount: row.amount
                    })
                    data.groups[row.groupname] = aar
                }
            } else {
                data.groups[row.groupname] = [{
                    ingredientname: row.ingredientname,
                    amount: row.amount
                }]
            }
        }

        var arr = []
        for (var i in data.groups) {
            arr.push({
                groupname: i,
                ingredient: data.groups[i]
            })
        }
        data.groups = arr;

        //获取菜谱成品图
        result = await Menu_pic.getMenuPicByMenuId(menu_id);
        for (var row of result) {
            data.chengpintu.push({
                url: row.path
            })
        }

        //获取菜谱步骤
        result = await Menu_pic.getMenuStepByMenuId(menu_id);
        for (var row of result) {
            data.steps.push({
                path: row.path,
                descript: row.descript
            })
        }

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

//审核菜谱
router.post('/checkMenu', async function (req, res) {
    var menu_id = req.body['menu_id'],
        state = req.body['state'],
        modified_time = util.getNowFormatDate(),

        tags = JSON.parse(req.body['tags'])


    try {
        var menu = new Menu({
            menu_id: menu_id,
            state: state,
            modified_time: modified_time,
        });

        var result = await menu.update()

        if (tags) { //通过了(添加菜谱分类)
            for (let tag of tags) { //保存分类
                var menu_type = new Menu_type({
                    menu_id: menu_id,
                    dictionary_id: tag.value,
                    state: 1
                })
                await menu_type.save()
            }
        }

        res.json({
            code: 999,
            data: '',
            msg: '审核成功'
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

//获取菜谱分类
router.post('/searchMenuType', async function (req, res) {
    var menu_id = req.body['menu_id'];

    try {

        var tags = []
        //获取菜谱分类
        var result = await Menu_type.getMenuTypeByMenuId(menu_id, 1)
        for (var row of result) {
            tags.push({
                value: row.dictionary_id,
                label: row.name,
                type: ""
            })
        }

        res.json({
            code: 999,
            data: tags,
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

//修改菜谱分类（先删后存）
router.post('/updataMenuType', async function (req, res) {
    var menu_id = req.body['menu_id'];
    tags = JSON.parse(req.body['tags'])

    try {
        //删除
        result = await Menu_type.deleteMenuTypeByMenuId(menu_id, 1)
        for (let tag of tags) { //保存分类
            var menu_type = new Menu_type({
                menu_id: menu_id,
                dictionary_id: tag.value,
                state: 1
            })
            await menu_type.save()
        }

        res.json({
            code: 999,
            data: '',
            msg: '修改菜谱分类成功'
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