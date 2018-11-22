var mysqlHelper = require("../mysqlHelper");

function Menu_ingredient(menu_ingredient) {
    this.menu_ingredient_id = menu_ingredient.menu_ingredient_id;
    this.menu_id = menu_ingredient.menu_id
    this.ingredient_id = menu_ingredient.ingredient_id;
    this.groupname = menu_ingredient.groupname;
    this.groupnum = menu_ingredient.groupnum;
    this.amount = menu_ingredient.amount;
};

//保存菜谱食材
Menu_ingredient.prototype.save = function save(callback) {
    var sql = "INSERT INTO menu_ingredient(menu_ingredient_id,menu_id,ingredient_id,groupname,groupnum,amount) VALUES(0,?,?,?,?,?)";
    let params = [this.menu_id,this.ingredient_id,this.groupname,this.groupnum,this.amount]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}
module.exports = Menu_ingredient;