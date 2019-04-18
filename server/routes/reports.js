var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Reports = require('../models/operation/reports'),
    Comment = require('../models/operation/comment')
//700: 其他错
//701：已举报
//999: 举报成功
//999：处理成功

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
            deal: 0,
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

    } catch (err) {
        res.json({
            code: 400,
            data: '',
            msg: err
        })
        return;
    }
});

//查询评论举报（条件查询）
router.post('/searchReportsBycondition', async function (req, res) {
    var any_id = req.body['any_id'],
        deal = req.body['deal'],
        commentState = req.body['commentState'], //评论类型
        buser_id = req.body['buser_id'],
        busername = req.body['busername'],
        mParam = JSON.parse(req.body['mParam'])

    var reports = new Reports({
        any_id: any_id,
        deal: deal,
    });

    try {
        var result1 = await Reports.searchReportsCount(reports, commentState, buser_id, busername)
        var result = await Reports.searchReports(reports, commentState, buser_id, busername, mParam)
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

//处理
router.post('/toDeal', async function (req, res) {
    var any_id = req.body['any_id'],
        deal = req.body['deal']

    try {
        var result
        result = await Reports.updataDeal(deal, any_id)

        if (deal == 2) {
            result = await Comment.updataBan(2, any_id)
        }

        res.json({
            code: 999,
            data: '',
            msg: '处理成功'
        })

    } catch (err) {
        res.json({
            code: 700,
            data: '',
            msg: err
        })
        return;
    }
});
module.exports = router;