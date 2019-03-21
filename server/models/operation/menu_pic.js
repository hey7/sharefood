var mysqlHelper = require("../mysqlHelper");

function Menu_pic(menu_pic) {
    this.menu_pic_id = menu_pic.menu_pic_id;
    this.menu_id = menu_pic.menu_id;
    this.path = menu_pic.path;
    this.step = menu_pic.step;
    this.descript = menu_pic.descript;
};

//保存菜谱图
Menu_pic.prototype.save = function save() {
    var sql = "INSERT INTO menu_pic(menu_pic_id,menu_id,path,step,descript) VALUES(0,?,?,?,?)";
    let params = [this.menu_id, this.path,this.step,this.descript]
    return mysqlHelper.execute1(sql, params)
}

//根据MenuId查询菜谱图（成品）
Menu_pic.getMenuPicByMenuId = function getMenuPicByMenuId(menu_id) {
    var sql = "SELECT path FROM menu_pic WHERE step = 0 AND menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.execute1(sql, params)
}

//根据MenuId查询菜谱步骤
Menu_pic.getMenuStepByMenuId = function getMenuStepByMenuId(menu_id) {
    var sql = "SELECT path,descript FROM menu_pic WHERE menu_id = ? AND step <> 0 ORDER BY step ";
    let params = [menu_id]
    return mysqlHelper.execute1(sql, params)
}

//删除菜谱图
Menu_pic.deleteMenuPicByMenuId = function deleteMenuPicByMenuId(menu_id) {
    var sql = "DELETE FROM menu_pic WHERE menu_id = ? ";
    let params = [menu_id]
    return mysqlHelper.execute1(sql, params)
}

// //根据MenuId查询食材
// Menu_pic.prototype.save = function save(callback) {
//     var sql = "INSERT INTO menu_pic(menu_pic_id,menu_id,path,step,descript) VALUES(0,?,?,?,?)";
//     let params = [this.menu_id, this.path,this.step,this.descript]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }



module.exports = Menu_pic;