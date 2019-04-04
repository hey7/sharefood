var mysqlHelper = require("../mysqlHelper");

function Menu(menu) {
    this.menu_id = menu.menu_id;
    this.user_id = menu.user_id;
    this.menuname = menu.menuname;
    this.iscreate = menu.iscreate;
    this.trick = menu.trick;
    this.descript = menu.descript;
    this.state = menu.state;
    this.create_time = menu.create_time;
    this.modified_time = menu.modified_time;
};

//保存菜谱
Menu.prototype.save = function save() {
    var sql = "INSERT INTO menu(menu_id,user_id,menuname,iscreate,trick,descript,state,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?)";
    let params = [this.user_id, this.menuname, this.iscreate, this.trick, this.descript, this.state, this.create_time, this.modified_time]
    return mysqlHelper.execute1(sql, params)
}
//修改菜谱
Menu.prototype.update = function update() {
    var sql = "UPDATE menu SET menuname = ?,iscreate = ?,trick = ?,descript = ?,state = ?,modified_time = ? WHERE menu_id = ?";
    let params = [this.menuname, this.iscreate, this.trick, this.descript, this.state, this.modified_time, this.menu_id]
    return mysqlHelper.execute1(sql, params)
}
//根据menu_id删除菜谱
Menu.deleteMenuByMenuId = function deleteMenuByMenuId(menu_id) {
    let sql = "UPDATE menu SET menu.state = 6 WHERE menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.execute1(sql, params)
}
//根据Userid查菜谱(第一张成品图和menu)
Menu.getMenuByUserId = function getMenuByUserId(user_id) {
    let sql = "SELECT menu.*,menu_pic.path FROM menu LEFT JOIN menu_pic ON menu.menu_id = menu_pic.menu_id where menu.user_id = ? AND menu_pic.step = 0 GROUP BY modified_time DESC";
    let params = [user_id]
    return mysqlHelper.execute1(sql, params)
}

//根据menu_id查菜谱
Menu.getMenuByMenuId = function getMenuByMenuId(menu_id) {
    let sql = "SELECT * from menu WHERE menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.single1(sql, params)
}

//查8个最新菜谱
Menu.getNewMenu = function getNewMenu() {
    let sql = "SELECT menu.menu_id,menu.menuname, menu_pic.path,`user`.username FROM menu LEFT JOIN menu_pic ON menu.menu_id = menu_pic.menu_id LEFT JOIN `user` ON menu.user_id = `user`.user_id WHERE menu_pic.step = 0 AND (menu.state = 4 OR menu.state = 5) ORDER BY menu.modified_time DESC LIMIT 8";
    let params = []
    return mysqlHelper.execute1(sql, params)
}

//一周热门
Menu.getOneWeekMenu = function getOneWeekMenu() {
    let sql = "SELECT menu.menu_id,menu_pic.path, menu.menuname, `user`.username FROM collection LEFT JOIN menu ON any_id = menu.menu_id " +
        "LEFT JOIN `user` ON menu.user_id = `user`.user_id LEFT JOIN menu_pic ON any_id = menu_pic.menu_id " +
        "WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= collection.create_time AND collection.state = 0 " +
        "AND (menu.state = 4 OR menu.state = 5) AND menu_pic.step = 0 GROUP BY any_id ORDER BY COUNT(any_id) DESC, menu.modified_time DESC LIMIT 8"
    let params = []
    return mysqlHelper.execute1(sql, params)
}

//最受欢迎
Menu.getPopularMenu = function getPopularMenu() {
    let sql = "SELECT menu.menu_id,menu_pic.path, menu.menuname, `user`.username FROM collection LEFT JOIN menu ON any_id = menu.menu_id " +
    "LEFT JOIN `user` ON menu.user_id = `user`.user_id LEFT JOIN menu_pic ON any_id = menu_pic.menu_id " +
    "WHERE collection.state = 0 AND (menu.state = 4 OR menu.state = 5) " +
    "AND menu_pic.step = 0 GROUP BY any_id ORDER BY COUNT(any_id) DESC, menu.modified_time DESC LIMIT 8"
    let params = []
    return mysqlHelper.execute1(sql, params)
}

//根据menu_id查菜谱基本信息
Menu.getMenuInfoByMenuId = function getMenuInfoByMenuId(menu_id) {
    let sql = "SELECT menu.user_id, `user`.username FROM menu LEFT JOIN `user` ON menu.user_id = `user`.user_id WHERE menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.single1(sql, params)
}

//SELECT any_id, menu_pic.path, menu.menuname, `user`.username, COUNT(any_id) as count FROM collection LEFT JOIN menu ON any_id = menu.menu_id
// LEFT JOIN `user` ON menu.user_id = `user`.user_id LEFT JOIN menu_pic ON any_id = menu_pic.menu_id
// WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= collection.create_time AND collection.state = 0
// AND menu_pic.step = 0 GROUP BY any_id ORDER BY count DESC LIMIT 8


// //保存菜谱
// Menu.prototype.save = function save(callback) {
//     var sql = "INSERT INTO menu(menu_id,user_id,menuname,iscreate,love,trick,descript,state,collection,weekcollection,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)";
//     let params = [this.user_id, this.menuname,this.iscreate,this.love,this.trick, this.descript,this.state,this.collection,this.weekcollection,this.create_time,this.modified_time]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

// //根据Userid查菜谱(第一张成品图和menu)
// Menu.getMenuByUserId = function getMenuByUserId(user_id, callback) {
//     let sql = "SELECT DATE_FORMAT(menu.modified_time,'%Y-%m-%d %H:%i:%s') AS modified_time1,menu.*,menu_pic.path FROM menu LEFT JOIN menu_pic ON menu.menu_id = menu_pic.menu_id where menu.user_id = ? AND menu_pic.step = 0 GROUP BY menu.menu_id";
//     let params = [user_id]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

// //根据menu_id删除菜谱
// Menu.deleteMenuByMenuId = function deleteMenuByMenuId(menu_id, callback) {
//     let sql = "UPDATE menu SET menu.state = 4 WHERE menu_id = ?";
//     let params = [menu_id]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }


module.exports = Menu;