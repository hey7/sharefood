var mysqlHelper = require("../mysqlHelper");

function Exhibition(exhibition) {
    this.exhibition_id = exhibition.exhibition_id;
    this.path = exhibition.path;
    this.create_time = exhibition.create_time;
};

//添加轮播图
Exhibition.prototype.save = function save() {
    var sql = "INSERT INTO exhibition(exhibition_id,path,create_time) VALUES(0,?,?)";
    let params = [this.path, this.create_time]
    return mysqlHelper.execute1(sql, params)
}

//查询所有轮播图
Exhibition.prototype.searchAll = function searchAll() {
    var sql = "SELECT path FROM exhibition";
    let params = []
    return mysqlHelper.execute1(sql, params)
}

//删除所有轮播图
Exhibition.prototype.deleteAll = function deleteAll() {
    var sql = "DELETE FROM exhibition";
    let params = []
    return mysqlHelper.execute1(sql, params)
}


module.exports = Exhibition;