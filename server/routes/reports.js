var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Reports = require('../models/operation/reports')

//700: 其他错
//701：已举报
//999: 举报成功

//举报评论
router.post('/addreports', async function (req, res) {
    var any_id = req.body['any_id'],
        user_id = JSON.parse(req.cookies.user).user_id,
        state = req.body['state'],
        create_time = util.getNowFormatDate()

    try {
        var reports = new Reports({
            user_id: user_id,
            any_id: any_id,
            state: state,
            create_time: create_time,
        });

        var result = await reports.getIsReports()
        if (result.num == 0) {
            var result = await reports.addReports()
            res.json({
                code: 999,
                data: '',
                msg: '举报成功'
            })
        } else {
            res.json({
                code: 701,
                data: '',
                msg: '已举报'
            })
        }
        console.log(result)

    } catch (err) {
        res.json({
            code: 400,
            data: '',
            msg: err
        })
        return;
    }
});


module.exports = router;