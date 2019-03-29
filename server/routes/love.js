var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Love = require('../models/operation/love')

//600: 其他错
//999: 点赞成功


//增加赞
router.post('/addLove', async function (req, res) {
    var any_id = req.body['any_id'],
        user_id = JSON.parse(req.cookies.user).user_id,
        state = req.body['state'],
        create_time = util.getNowFormatDate()
    try {
        var love = new Love({
            user_id: user_id,
            any_id: any_id,
            state: state,
            create_time: create_time,
        });

        var result = await love.addLove()
        res.json({
            code: 999,
            data: '',
            msg: '已赞'
        })
    } catch (err) {
        res.json({
            code: 600,
            data: '',
            msg: err
        })
        return;
    }
});



module.exports = router;