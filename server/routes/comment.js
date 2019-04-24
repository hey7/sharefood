var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数

    Comment = require('../models/operation/comment'),
    Reports = require('../models/operation/reports'),
    Menu = require('../models/operation/menu')

//400: 其他错
//999：评论成功
//999：查询成功
//999：删除评论成功
//999：修改成功

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
        var commentNum = 0
        var comment = {}
        for (var row of result) {
            if (row.top_id == 0) {
                comment[row.comment_id] = row
                comment[row.comment_id].children = []
                commentNum++
            } else {
                if (comment[row.top_id]) {
                    comment[row.top_id].children.push(row)
                    commentNum++
                }
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
        var result = await Reports.delReports(comment_id, 0)
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

//查询私信数
router.post('/searchPrivateLetterNum', async function (req, res) {
    var user_id_to = JSON.parse(req.cookies.user).user_id,
        ban = 0

    try {
        var result = await Comment.searchCommentNum(user_id_to, ban)

        res.json({
            code: 999,
            data: result,
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

//已查阅所有私信
router.post('/privateLetterChecked', async function (req, res) {
    var user_id_to = JSON.parse(req.cookies.user).user_id

    try {
        var result = await Comment.updataBanbychecked(1, user_id_to, 0)

        res.json({
            code: 999,
            data: '',
            msg: '修改成功'
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

//查询通知数
router.post('/searchNoticeNum', async function (req, res) {
    var user_id = JSON.parse(req.cookies.user).user_id,
        ban = 2
    try {
        var result = await Menu.searchMenuNum(user_id) //菜谱未读
        var result1 = await Comment.searchCommentNumFrom(user_id, ban) //评论被禁未读


        res.json({
            code: 999,
            data: {
                checkedNum: result.count,
                reportsNum: result1.count
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

//已查阅所有通知(审核)
router.post('/checkedChecked', async function (req, res) {
    var user_id = JSON.parse(req.cookies.user).user_id,
        modified_time = util.getNowFormatDate()

    try {
        var result
        result = await Menu.updataStatebychecked(3, modified_time, user_id, 2) //菜谱退稿未读
        result = await Menu.updataStatebychecked(5, modified_time, user_id, 4) //菜谱已发布未读

        res.json({
            code: 999,
            data: '',
            msg: '修改成功'
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
//已查阅所有通知（举报）
router.post('/reportsChecked', async function (req, res) {
    var user_id_from = JSON.parse(req.cookies.user).user_id
    try {
        var result = await Comment.updataBanbycheckedFrom(3, user_id_from, 2) //评论被禁改为已读

        res.json({
            code: 999,
            data: '',
            msg: '修改成功'
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

//查询所有评论对自己的（私信）
router.post('/searchCommentToMy', async function (req, res) {
    var user_id_to = JSON.parse(req.cookies.user).user_id

    try {
        var result = await Comment.searchToMy(0, user_id_to)

        res.json({
            code: 999,
            data: result,
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

//查询所有评论来自自己的（私信）被禁
router.post('/searchFromMyByReports', async function (req, res) {
    var user_id_from = JSON.parse(req.cookies.user).user_id

    try {
        var result = await Comment.searchFromMyByReports(0, user_id_from)

        res.json({
            code: 999,
            data: result,
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



module.exports = router;