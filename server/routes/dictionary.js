var express = require('express'),
    router = express.Router(),
    util = require('../util/util'), //公共函数
    Dictionary = require('../models/operation/dictionary')

//300 其他错
//301 启动失败：上级为禁用状态
//302 添加失败：上级为禁用状态
//999 查询字典成功
//999 添加字典成功
//999 修改字典名称成功

//根据一堆name，获取每个top的孩子
router.post('/getAlldictionaryByName', async function (req, res) {
    var nameArr = req.body['nameArr[]']
    try {
        var result = {};
        var oneResult
        for (var i in nameArr) {
            var name = nameArr[i]
            oneResult = await Dictionary.getDictionaryByName(name,0)
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

//查询所有顶级分类
router.post('/getAllTopDictionary', async function (req, res) {
    try {
        var result = await Dictionary.searchDictionary(new Dictionary({
            top_id: "0"
        }), '')

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

//根据Dictionaryid，获取孩子
router.post('/getChildsByDictionaryid', async function (req, res) {
    var upper_id = req.body['upper_id']
    try {
        var result = await Dictionary.searchDictionary(new Dictionary({
            upper_id: upper_id
        }), '')

        for (var i in result) {
            if (result[i].isLeaf == 0) {
                result[i].hasChildren = true
            }
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

//添加字典
router.post('/addDictionary', async function (req, res) {
    var upper_id = req.body['upper_id'],
        name = req.body['name'],
        top_id = req.body['top_id'],
        state = req.body['state'],
        isLeaf = req.body['isLeaf'],
        create_time = util.getNowFormatDate(),
        modified_time = util.getNowFormatDate();

    var dictionary = new Dictionary({
        upper_id: upper_id,
        name: name,
        top_id: top_id,
        state: state,
        isLeaf: isLeaf,
        create_time: create_time,
        modified_time: modified_time
    });
    try {
        var result
        if (state == 0) {
            result = await Dictionary.searchDictionary(new Dictionary({
                dictionary_id: upper_id
            }), '')
            result = result[0]
            if (result.state == 1) {
                res.json({
                    code: 302,
                    data: '',
                    msg: '添加失败：上级为禁用状态'
                })
                return;
            }
        }
        result = await dictionary.save()

        var dictionary1 = new Dictionary({
            dictionary_id: upper_id,
            isLeaf: "0",
            modified_time: modified_time
        });
        result = await dictionary1.updateDictionary()

        res.json({
            code: 999,
            data: '',
            msg: '添加字典成功'
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

//修改字典状态
router.post('/updateDictionaryState', async function (req, res) {
    var dictionary_id = req.body['dictionary_id'],
        state = req.body['state'],
        upper_id = req.body['upper_id'],
        modified_time = util.getNowFormatDate();

    var dictionary = new Dictionary({
        dictionary_id: dictionary_id,
        state: state,
        modified_time: modified_time
    });
    try {
        var result
        var dictionary1

        if (state == 1) { //改为禁用（下面全禁）
            result = await dictionary.updateDictionary()
            result = await Dictionary.searchDictionary(new Dictionary({
                upper_id: dictionary_id
            }), '')
            if (result.length !== 0) {
                for (var i in result) {
                    dictionary1 = new Dictionary({
                        dictionary_id: result[i].dictionary_id,
                        state: state,
                        modified_time: modified_time
                    });

                    await dictionary1.updateDictionary()
                }
            }
        } else { //改为启用(上级是启用的，才能启用)
            result = await Dictionary.searchDictionary(new Dictionary({
                dictionary_id: upper_id
            }), '')
            result = result[0]
            if (result.state == 0) {
                result = await dictionary.updateDictionary()
            } else {
                res.json({
                    code: 301,
                    data: '',
                    msg: '启用失败：上级为禁用状态'
                })
                return;
            }


        }
        res.json({
            code: 999,
            data: '',
            msg: '修改字典状态成功'
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

//修改字典名称
router.post('/updateDictionaryName', async function (req, res) {
    var dictionary_id = req.body['dictionary_id'],
        name = req.body['name'],
        modified_time = util.getNowFormatDate();

    var dictionary = new Dictionary({
        dictionary_id: dictionary_id,
        name: name,
        modified_time: modified_time
    });

    try {
        var result = await dictionary.updateDictionary()

        res.json({
            code: 999,
            data: '',
            msg: '修改字典名称成功'
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

//获取菜谱分类用于审核菜谱分类(得到的参数是“菜谱分类”)
router.post('/getChildsByDictionaryName', async function (req, res) {
    var name = req.body['name']
    try {
        var result = [];

        var secondResult = await Dictionary.getDictionaryByName(name,0)

        for (var i of secondResult) {
            var a = {
                value: i.dictionary_id,
                label: i.name
            }
            if (i.isLeaf == 0) {
                a.children = []
                var thirdResult = await Dictionary.searchDictionary(new Dictionary({
                    upper_id: i.dictionary_id
                }), '')
                for (var j of thirdResult) {
                    a.children.push({
                        value: j.dictionary_id,
                        label: j.name,
                    })
                }
            }
            result.push(a)
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