var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Comment = require('../models/operation/comment')
    Reports = require('../models/operation/reports')

//400: 其他错
//999：评论成功
//999：查询成功
//999：删除评论成功

//增加评论
router.post('/addComment', async function (req, res) {
    var any_id = req.body['any_id'],
        user_id = req.body['user_id'],
        user_id_from = JSON.parse(req.cookies.user).user_id,
        user_id_to = req.body['user_id_to'],
        state = req.body['state'],
        top_id = req.body['top_id'],
        content = req.body['content'],
        ban = 0,
        create_time = util.getNowFormatDate()

    try {
        var comment = new Comment({
            any_id: any_id,
            user_id: user_id,
            user_id_from: user_id_from,
            user_id_to: user_id_to,
            state: state,
            top_id: top_id,
            content: content,
            ban: ban,
            create_time: create_time
        });

        var result = await comment.save()
        res.json({
            code: 999,
            data: '',
            msg: '评论成功'
        })
    } catch (err) {
        res.json({
            code: 400,
            data: '',
            msg: err
        })
        return;
    }
});

//查询所有评论
router.post('/searchComment', async function (req, res) {
    var any_id = req.body['any_id'],
        state = req.body['state']

    try {
        var result = await Comment.search(state, any_id)
        var commentNum = result.length
        var comment = {}
        for (var row of result) {
            if (row.top_id == 0) {
                comment[row.comment_id] = row
                comment[row.comment_id].children = []
            } else {
                comment[row.top_id].children.push(row)
            }
        }
        res.json({
            code: 999,
            data: {
                commentNum: commentNum,
                comment: comment
            },
            msg: '查询成功'
        })
    } catch (err) {
        res.json({
            code: 400,
            data: '',
            msg: err
        })
        return;
    }
});

//删除评论（一个以及底下都删,举报也都删了）
router.post('/delComment', async function (req, res) {
    var comment_id = req.body['comment_id']

    try {
        var result = await Reports.delReports(comment_id,0)
        var result = await Comment.deleteComment(comment_id)

        res.json({
            code: 999,
            data: "",
            msg: '删除评论成功'
        })
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