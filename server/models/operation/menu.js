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
    let sql = "UPDATE menu SET modified_time = ? ";
    let params = []
    params.push(this.modified_time)

    if (this.menuname != null && this.menuname != '') {
        sql = sql + ', menuname = ? '
        params.push(this.menuname)
    }
    if (this.iscreate != null && this.iscreate != '') {
        sql = sql + ', iscreate = ? '
        params.push(this.iscreate)
    }
    if (this.trick != null && this.trick != '') {
        sql = sql + ', trick = ? '
        params.push(this.trick)
    }
    if (this.descript != null && this.descript != '') {
        sql = sql + ', descript = ? '
        params.push(this.descript)
    }
    if (this.state != null && this.state != '') {
        sql = sql + ', state = ? '
        params.push(this.state)
    }
    sql = sql + 'WHERE menu_id = ?'
    params.push(this.menu_id)

    return mysqlHelper.execute1(sql, params)
}

//根据Userid查菜谱(第一张成品图和menu)
Menu.getMenuByUserId = function getMenuByUserId(user_id) {
    let sql = "SELECT menu.*,menu_pic.path,(select count(*) from collection c where c.any_id = menu.menu_id AND c.state = 0) AS collection,(select count(*) from love l where l.any_id = menu.menu_id AND l.state = 0) AS love FROM menu LEFT JOIN menu_pic ON menu.menu_id = menu_pic.menu_id where menu.user_id = ? AND menu_pic.step = 0 Group By menu_id ORDER BY modified_time DESC";
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
    let sql = "SELECT menu.menu_id,menu.menuname, menu_pic.path,`user`.username FROM menu LEFT JOIN menu_pic ON menu.menu_id = menu_pic.menu_id LEFT JOIN `user` ON menu.user_id = `user`.user_id WHERE menu_pic.step = 0 AND (menu.state = 4 OR menu.state = 5) GROUP BY menu.menu_id ORDER BY menu.modified_time DESC LIMIT 8";
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

//根据种类查询菜谱
Menu.searchMenuBytype = function searchMenuBytype(type) {
    let sql = "SELECT mt.menu_id ,mp.path, m.menuname,u.username FROM menu_type mt LEFT JOIN menu m ON mt.menu_id = m.menu_id LEFT JOIN `user` u ON m.user_id = u.user_id LEFT JOIN menu_pic mp ON mt.menu_id = mp.menu_id  where (m.state = 4 OR m.state = 5) AND mp.step = 0 ";
    let params = []
    var sql1 = ""

    for (let index = 0; index < type.length; index++) {
        if (index == 0) {
            sql = sql + 'AND mt.dictionary_id = ? '
        } else {
            sql = sql + 'AND mt.menu_id IN ( SELECT menu_id FROM menu_type WHERE menu_type.dictionary_id = ? '
            sql1 = sql1 + " ) "
        }
        if (index == type.length - 1) {
            sql = sql + sql1
        }
        params.push(type[index])
    }

    sql = sql + 'GROUP BY mt.menu_id'

    return mysqlHelper.execute1(sql, params)
}

//根据menu_id查菜谱基本信息
Menu.getMenuInfoByMenuId = function getMenuInfoByMenuId(menu_id) {
    let sql = "SELECT menu.*, `user`.username FROM menu LEFT JOIN `user` ON menu.user_id = `user`.user_id WHERE menu_id = ?";
    let params = [menu_id]
    return mysqlHelper.single1(sql, params)
}

//查询食材(条件、分页)
Menu.searchMenu = function searchMenu(menu, username, Param) {
    let sql = "SELECT m.menu_id,m.menuname,m.user_id,u.username,m.state,m.create_time,m.modified_time FROM menu m LEFT JOIN `user` u ON m.user_id = u.user_id WHERE 1=1 ";
    let params = []
    if (username != null && username != '') {
        sql = sql + 'AND username=? '
        params.push(username)
    }
    if (menu.menu_id != null && menu.menu_id != '') {
        sql = sql + 'AND menu_id=? '
        params.push(menu.menu_id)
    }
    if (menu.user_id != null && menu.user_id != '') {
        sql = sql + 'AND m.user_id=? '
        params.push(menu.user_id)
    }
    if (menu.menuname != null && menu.menuname != '') {
        sql = sql + 'AND menuname=? '
        params.push(menu.menuname)
    }
    if (menu.state != null && menu.state != '') {
        if (menu.state == '2||3') {
            sql = sql + 'AND (m.state = 2 OR m.state = 3)'
        } else if (menu.state == '4||5') {
            sql = sql + 'AND (m.state = 4 OR m.state = 5)'
        } else {
            sql = sql + 'AND m.state=? '
            params.push(menu.state)
        }
    } else {
        sql = sql + 'AND (m.state <> 0 AND m.state <> 6)'
    }
    sql = sql + 'limit ?, ?'

    params.push((Param.pageNum - 1) * Param.pageSize)
    params.push(Param.pageSize)
    return mysqlHelper.execute1(sql, params)
}

//查询菜谱总页数(条件)
Menu.searchMenuCount = function searchMenuCount(menu, username) {
    let sql = "SELECT COUNT(*) AS count FROM menu m LEFT JOIN `user` u ON m.user_id = u.user_id WHERE 1=1 ";
    let params = []
    if (username != null && username != '') {
        sql = sql + 'AND username=? '
        params.push(username)
    }
    if (menu.menu_id != null && menu.menu_id != '') {
        sql = sql + 'AND menu_id=? '
        params.push(menu.menu_id)
    }
    if (menu.user_id != null && menu.user_id != '') {
        sql = sql + 'AND m.user_id=? '
        params.push(menu.user_id)
    }
    if (menu.menuname != null && menu.menuname != '') {
        sql = sql + 'AND menuname=? '
        params.push(menu.menuname)
    }
    if (menu.state != null && menu.state != '') {
        if (menu.state == '2||3') {
            sql = sql + 'AND (m.state = 2 OR m.state = 3)'
        } else if (menu.state == '4||5') {
            sql = sql + 'AND (m.state = 4 OR m.state = 5)'
        } else {
            sql = sql + 'AND m.state=? '
            params.push(menu.state)
        }
    } else {
        sql = sql + 'AND (m.state <> 0 AND m.state <> 6)'
    }
    return mysqlHelper.single1(sql, params)
}


//查询本人未读菜谱数(状态为2和4)
Menu.searchMenuNum = function searchMenuNum(user_id) {
    var sql = "SELECT COUNT(*) AS count FROM menu WHERE user_id = ? AND (state = 2 OR state = 4)";
    let params = [user_id]
    return mysqlHelper.single1(sql, params)
}

//更改状态（改为已读）
Menu.updataStatebychecked = function updataStatebychecked(state,modified_time,user_id,state1) {
    var sql = "UPDATE menu SET state = ?,modified_time = ? WHERE user_id = ? AND state = ?";
    let params = [state,modified_time,user_id,state1]
    return mysqlHelper.execute1(sql, params)
}

//查询已审核完的自己的菜谱
Menu.searchMenuBychecked = function searchMenuBychecked(user_id) {
    var sql = "SELECT m.*, mp.path FROM menu m LEFT JOIN menu_pic mp ON m.menu_id = mp.menu_id WHERE m.user_id = ? AND (m.state=2 OR m.state=3 OR m.state=4 OR m.state=5) AND mp.step = 0 GROUP BY m.menu_id ORDER BY m.modified_time DESC";
    let params = [user_id]
    return mysqlHelper.execute1(sql, params)
}
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