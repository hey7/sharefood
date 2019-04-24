var mysqlHelper = require("../mysqlHelper");

function Love(love) {
    this.love_id = love.love_id;
    this.user_id = love.user_id;
    this.any_id = love.any_id;
    this.state = love.state;
    this.create_time = love.create_time;
};

//某总共点赞数
Love.getLoveNum = function getLoveNum(love) {
    let sql = "SELECT COUNT(1) AS num FROM love WHERE 1=1 "
    let params = []
    if (love.user_id != null && love.user_id != '') {
        sql = sql + 'AND user_id=? '
        params.push(love.user_id)
    }
    if (love.any_id != null && love.any_id != '') {
        sql = sql + 'AND any_id=? '
        params.push(love.any_id)
    }
    if (love.state != null && love.state != '') {
        sql = sql + 'AND state=? '
        params.push(love.state)
    }
    return mysqlHelper.single1(sql, params)
}

//增加赞
Love.prototype.addLove = function addLove() {
    let sql = "INSERT INTO love(love_id,user_id,any_id,state,create_time) VALUES(0,?,?,?,?)"
    let params = [this.user_id,this.any_id, this.state,this.create_time]
    return mysqlHelper.execute1(sql, params)
}


module.exports = Love;