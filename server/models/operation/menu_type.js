var mysqlHelper = require("../mysqlHelper");

function Menu_type(menu_type) {
    this.menu_type_id = menu_type.menu_type_id;
    this.menu_id = menu_type.menu_id;
    this.dictionary_id = menu_type.dictionary_id;
};

// //保存菜谱分类
// Menu_type.prototype.save = function save(callback) {
//     var sql = "INSERT INTO menu_type(menu_type_id,menu_id,dictionary_id) VALUES(0,?,?)";
//     let params = [this.menu_id, this.dictionary_id]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

//保存菜谱分类
Menu_type.prototype.save = function save() {
    var sql = "INSERT INTO menu_type(menu_type_id,menu_id,dictionary_id) VALUES(0,?,?)";
    let params = [this.menu_id, this.dictionary_id]
    return mysqlHelper.execute1(sql, params)
}

//根据菜谱分类
Menu_type.getMenuTypeByMenuId = function getMenuTypeByMenuId(menu_id) {
    var sql = "SELECT d1.name, d1.top_id, d2.name as type FROM menu_type LEFT JOIN dictionary d1 ON menu_type.dictionary_id = d1.dictionary_id LEFT JOIN dictionary d2 ON d1.top_id = d2.dictionary_id WHERE menu_type.menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.execute1(sql, params)
}



module.exports = Menu_type;