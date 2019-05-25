var mysqlHelper = require("../mysqlHelper");

function Collection(collection) {
    this.collection_id = collection.collection_id;
    this.user_id = collection.user_id;
    this.any_id = collection.any_id;
    this.state = collection.state;
    this.create_time = collection.create_time;
};

//查询收藏数
Collection.getCollectionNum = function getCollectionNum(collection) {
    let sql = "SELECT COUNT(1) AS num FROM collection WHERE 1=1 ";
    let params = []
    if (collection.user_id != null && collection.user_id != '') {
        sql = sql + 'AND user_id=? '
        params.push(collection.user_id)
    }
    if (collection.any_id != null && collection.any_id != '') {
        sql = sql + 'AND any_id=? '
        params.push(collection.any_id)
    }
    if (collection.state != null && collection.state != '') {
        sql = sql + 'AND state=? '
        params.push(collection.state)
    }
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
    let sql = "SELECT c.collection_id,c.create_time,c.any_id, m.menuname,mp.path,u.username FROM collection c LEFT JOIN menu m ON m.menu_id = c.any_id " +
        "LEFT JOIN menu_pic mp ON c.any_id = mp.menu_id LEFT JOIN `user` u ON u.user_id = m.user_id WHERE mp.step = 0 AND c.state = 0 " +
        "AND c.user_id=? "
    let params = [user_id]
    if (menuname != null && menuname != '') {
        sql = sql + "AND m.menuname like ? "
        params.push("%" + menuname + "%")
    }
    sql = sql + 'GROUP BY c.collection_id ORDER BY c.create_time DESC'
    return mysqlHelper.execute1(sql, params)
}

//删除收藏
Collection.delCollection = function delCollection(collection_id) {
    let sql = "DELETE FROM collection WHERE collection_id = ?";
    let params = [collection_id]
    return mysqlHelper.execute1(sql, params)
}

module.exports = Collection;