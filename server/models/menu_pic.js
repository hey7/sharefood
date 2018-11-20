var mysqlHelper = require("./mysqlHelper");

function Menu_pic(menu_pic) {
    this.menu_pic_id = menu_pic.menu_pic_id;
    this.menu_id = menu_pic.menu_id;
    this.path = menu_pic.path;
    this.step = menu_pic.path;
    this.explain = menu_pic.explain;
};

//保存菜谱
Menu_pic.prototype.save = function save(callback) {
    var sql = "INSERT INTO menu(menu_pic_id,menu_id,path,step,explain) VALUES(0,?,?,?,?)";
    let params = [this.menu_id, this.path,this.step,this.explain]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}

module.exports = Menu_pic;