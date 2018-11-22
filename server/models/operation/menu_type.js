var mysqlHelper = require("../mysqlHelper");

function Menu_type(menu_type) {
    this.menu_type_id = menu_type.menu_type_id;
    this.menu_id = menu_type.menu_id;
    this.dictionary_id = menu_type.dictionary_id;
};

//保存菜谱分类
Menu_type.prototype.save = function save(callback) {
    var sql = "INSERT INTO menu_type(menu_type_id,menu_id,dictionary_id) VALUES(0,?,?)";
    let params = [this.menu_id, this.dictionary_id]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}

module.exports = Menu_type;