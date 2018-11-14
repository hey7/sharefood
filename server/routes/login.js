var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')

router.post('/', function (req, res) {
    var username = req.body['username']
    var password = req.param('password')
    console.log('password'+password)
    
    //User.getUserNumByName("1", function (err, results) {
        
    //})

    res.json({
        code: 0,
        data: username+'+'+password
    })
});
module.exports = router;