var mysqlHelper = require("../mysqlHelper");

function Menu(menu) {
    this.menu_id = menu.menu_id;
    this.user_id = menu.user_id;
    this.menuname = menu.menuname;
    this.iscreate = menu.iscreate;
    this.love = menu.love;
    this.trick = menu.trick;
    this.descript = menu.descript;
    this.state = menu.state;
    this.collection = menu.collection;
    this.weekcollection = menu.weekcollection;
    this.create_time = menu.create_time;
    this.modified_time = menu.modified_time;

    this.chengpintu = menu.chengpintu;
    this.type = menu.type;
    this.groups = menu.groups;
    this.steps = menu.steps;
};

//保存菜谱
Menu.prototype.save = function save(callback) {
    var sql = "INSERT INTO menu(menu_id,user_id,menuname,iscreate,love,trick,descript,state,collection,weekcollection,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)";
    let params = [this.user_id, this.menuname,this.iscreate,this.love,this.trick, this.descript,this.state,this.collection,this.weekcollection,this.create_time,this.modified_time]
    mysqlHelper.execute(sql, params, function (err, result) {
        callback(err, result);
    })
}

module.exports = Menu;