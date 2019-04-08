var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置
    util = require('../util/util'), //公共函数

    Exhibition = require('../models/operation/exhibition')

//800 其他错
//999 上传图片成功
//999 查询轮播图成功
//999 修改成功

//上传图片
router.post('/imgUpload', function (req, res) {
    uploadModel.uploadPhoto(req, config.upload_exhibition_path, function (err, fields, uploadPath) {
        if (err) {
            res.json({
                code: 800,
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

//查询所有轮播图
router.post('/getAllCarousel', async function (req, res) {
    try {

        result = await Exhibition.searchAll()

        res.json({
            code: 999,
            data: result,
            msg: '查询轮播图成功'
        })
        return;

    } catch (err) {
        res.json({
            code: 300,
            data: '',
            msg: err
        })
        return;
    }
});

//修改轮播图（删完再加）
router.post('/updataCarousel', async function (req, res) {
    var carousel = JSON.parse(req.body['carousel'])
    try {
        var result;
        result = await Exhibition.deleteAll()

        for (let item of carousel) {
            var exhibition = new Exhibition({
                path: item.url,
                create_time: util.getNowFormatDate()
            })

            result = exhibition.save()
        }

        res.json({
            code: 999,
            data: '',
            msg: '保存轮播图成功'
        })
        return;

    } catch (err) {
        res.json({
            code: 800,
            data: '',
            msg: err
        })
        return;
    }
});
module.exports = router;