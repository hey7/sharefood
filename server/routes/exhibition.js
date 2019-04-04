var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'), //上传model
    config = require('../util/config'), //公共配置

    Exhibition = require('../models/operation/exhibition')

//800 其他错
//999 成功

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

module.exports = router;