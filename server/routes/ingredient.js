var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    util = require('../util/util'), //公共函数

    Ingredient = require('../models/operation/ingredient')

//900: 其他错
//999：查询成功
//999：修改成功

//首页食材展示(时令食材【这个月的食材、并且菜谱运用最高的前14个】)
router.post('/getIngredientIndexShow', async function (req, res) {
    var now = new Date().getMonth();
    var now1 = new Date().getMonth() + 1;
    var now2 = new Date().getMonth() + 2;

    try {
        var result = await Ingredient.getIngredientShow(now,now1,now2)

        res.json({
            code: 999,
            data: result,
            msg: '获得菜谱成功'
        })
        return;

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }
});

//查询食材详情
router.post('/getdetailIngredient', async function (req, res) {
    var ingredient_id = req.body['ingredient_id']

    try {
        result = await Ingredient.searchIngredient(
            new Ingredient({
                ingredient_id: ingredient_id
            }), '')
        var ingredient = result[0]

        var menus = await Ingredient.getMenuByIngredientId(ingredient_id)
        res.json({
            code: 999,
            data: {
                ingredient: ingredient,
                menus: menus
            },
            msg: '查询成功'
        })

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }
});

////////////////
//上传图片
router.post('/imgUpload', function (req, res) {
    //uploadModel.uploadPhoto(req, 'upload/menu', function (err, fields, uploadPath) {
    uploadModel.uploadPhoto(req, config.upload_ingredient_pic_path, function (err, fields, uploadPath) {
        if (err) {
            res.json({
                code: 900,
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

//查询食材（条件查询）
router.post('/searchIngredientBycondition', async function (req, res) {
    var ingredient_id = req.body['ingredient_id'],
        ingredientname = req.body['ingredientname'],
        state = req.body['state'],
        mParam = JSON.parse(req.body['mParam'])

    var ingredient = new Ingredient({
        ingredient_id: ingredient_id,
        ingredientname: ingredientname,
        state: state
    });

    try {
        var result1 = await Ingredient.searchIngredientCount(ingredient)
        var result = await Ingredient.searchIngredient(ingredient, mParam)
        res.json({
            code: 999,
            data: result,
            total: result1.count,
            msg: '查询成功'
        })

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }
});

//查询食材详情
router.post('/searchIngredient', async function (req, res) {
    var ingredient_id = req.body['ingredient_id']

    try {
        result = await Ingredient.searchIngredient(
            new Ingredient({
                ingredient_id: ingredient_id
            }), '')
        var result = result[0]
       
        res.json({
            code: 999,
            data: result,
            msg: '查询成功'
        })

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }
});

//编辑食材
router.post('/editIngredient', async function (req, res) {
    var ingredient = JSON.parse(req.body['ingredient'])
    ingredient.modified_time = util.getNowFormatDate()

    try {
        ingredient = new Ingredient(ingredient)
        var result = await ingredient.update()
        res.json({
            code: 999,
            data: '',
            msg: '修改成功'
        })

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }
});


//删除食材（改状态）
router.post('/deleteIngredient', async function (req, res) {
    var ingredient_id = req.body['ingredient_id'],
        modified_time = util.getNowFormatDate(),
        state = "2"
    try {
        var ingredient = new Ingredient({
            ingredient_id: ingredient_id,
            modified_time: modified_time,
            state: state
        })

        var result = await ingredient.update()
        res.json({
            code: 999,
            data: '',
            msg: '删除食材成功'
        })

    } catch (err) {
        res.json({
            code: 900,
            data: '',
            msg: err
        })
        return;
    }


});
module.exports = router;