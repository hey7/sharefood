var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Collection = require('../models/operation/collection')

//500: 其他错
//999: 收藏成功


//增加收藏
router.post('/addCollection', async function (req, res) {
    var any_id = req.body['any_id'],
        user_id = JSON.parse(req.cookies.user).user_id,
        state = req.body['state'],
        create_time = util.getNowFormatDate()
    try {
        var collection = new Collection({
            user_id: user_id,
            any_id: any_id,
            state: state,
            create_time: create_time,
        });

        var result = await collection.addCollection()
        res.json({
            code: 999,
            data: '',
            msg: '已收藏'
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

module.exports = router;