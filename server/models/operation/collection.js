var mysqlHelper = require("../mysqlHelper");

function Collection(collection) {
    this.collection_id = collection.collection_id;
    this.user_id = collection.user_id;
    this.any_id = collection.any_id;
    this.state = collection.state;
    this.create_time = collection.create_time;
};

//该用户是否收藏过某
Collection.prototype.getIsCollection = function getIsCollection() {
    let sql = "SELECT COUNT(1) AS num FROM collection WHERE user_id=? AND any_id =? AND state =?"
    let params = [this.user_id, this.any_id, this.state]
    return mysqlHelper.single1(sql, params)
}

//某总共收藏数
Collection.prototype.getCollectionNum = function getCollectionNum() {
    let sql = "SELECT COUNT(1) AS num FROM collection WHERE any_id =? AND state =?"
    let params = [this.any_id, this.state]
    return mysqlHelper.single1(sql, params)
}

//增加收藏
Collection.prototype.addCollection = function addCollection() {
    let sql = "INSERT INTO collection(collection_id,user_id,any_id,state,create_time) VALUES(0,?,?,?,?)"
    let params = [this.user_id, this.any_id, this.state, this.create_time]
    return mysqlHelper.execute1(sql, params)
}


//查找该用户收藏（菜谱的）
Collection.searchMenuCollection = function searchMenuCollection(user_id, menuname) {
    let sql = "SELECT c.create_time,c.any_id, m.menuname,mp.path,u.username FROM collection c LEFT JOIN menu m ON m.menu_id = c.any_id " +
        "LEFT JOIN menu_pic mp ON c.any_id = mp.menu_id LEFT JOIN `user` u ON u.user_id = m.user_id WHERE mp.step = 0 AND c.state = 0 " +
        "AND c.user_id=? "
    let params = [user_id]
    if (menuname != null && menuname != '') {
        sql = sql + "AND m.menuname like ? "
        params.push( "%"+menuname+"%")
    }
    sql = sql + 'ORDER BY c.create_time DESC'

    return mysqlHelper.execute1(sql, params)
}
module.exports = Collection;