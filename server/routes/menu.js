var express = require('express'),
    router = express.Router(),
    uploadModel = require('../models/uploadModel'); //上传model

//200 其他错
//201 上传图片成功

//上传图片
router.post('/imgUpload', function (req, res) {
    uploadModel.uploadPhoto(req, 'upload/menu', function (err, fields, uploadPath) {
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
                fields:fields,  //表单中字段信息
                uploadPath:uploadPath   //上传图片的相对路径
            },
            msg: '上传图片成功'
        })
    });
});
module.exports = router;