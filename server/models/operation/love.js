var mysqlHelper = require("../mysqlHelper");

function Love(love) {
    this.love_id = love.love_id;
    this.user_id = love.user_id;
    this.any_id = love.any_id;
    this.state = love.state;
    this.create_time = love.create_time;
};

//该用户是否点赞过某
Love.prototype.getIsLove = function getIsLove() {
    let sql = "SELECT COUNT(1) AS num FROM love WHERE user_id=? AND any_id =? AND state =?"
    let params = [this.user_id, this.any_id, this.state]
    return mysqlHelper.single1(sql, params)
}

//某总共收藏数
Love.prototype.getLoveNum = function getLoveNum() {
    let sql = "SELECT COUNT(1) AS num FROM love WHERE any_id =? AND state =?"
    let params = [this.any_id, this.state]
    return mysqlHelper.single1(sql, params)
}

//增加赞
Love.prototype.addLove = function addLove() {
    let sql = "INSERT INTO love(love_id,user_id,any_id,state,create_time) VALUES(0,?,?,?,?)"
    let params = [this.user_id,this.any_id, this.state,this.create_time]
    return mysqlHelper.execute1(sql, params)
}


module.exports = Love;