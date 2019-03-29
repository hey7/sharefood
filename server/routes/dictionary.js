var express = require('express'),
    router = express.Router(),

    Dictionary = require('../models/operation/dictionary')

//300 其他错
//999 查询字典成功

//根据一堆name，获取每个top的孩子
router.post('/getAlldictionaryByName', async function (req, res) {
    var nameArr = req.body['nameArr[]']
    try {
        var result = {};
        var oneResult
        for(var i in nameArr) {
            var name = nameArr[i]
            oneResult= await Dictionary.getDictionaryByName(name)
            result[name] = oneResult
        }
        res.json({
            code: 999,
            data: result,
            msg: '查询字典成功'
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
module.exports = router;