var mysqlHelper = require("../mysqlHelper");

function Reports(reports) {
    this.reports_id = reports.reports_id;
    this.user_id = reports.user_id;
    this.any_id = reports.any_id;
    this.state = reports.state;
    this.deal = reports.deal;
    this.create_time = reports.create_time;
};

//该用户是否举报过
Reports.prototype.getIsReports = function getIsReports() {
    let sql = "SELECT COUNT(1) AS num FROM reports WHERE user_id=? AND any_id =? AND state =?"
    let params = [this.user_id, this.any_id, this.state]
    return mysqlHelper.single1(sql, params)
}

//增加举报
Reports.prototype.addReports = function addReports() {
    let sql = "INSERT INTO reports(reports_id,user_id,any_id,state,deal,create_time) VALUES(0,?,?,?,?,?)"
    let params = [this.user_id, this.any_id, this.state, this.deal, this.create_time]
    return mysqlHelper.execute1(sql, params)
}

//删除举报
Reports.delReports = function delReports(any_id, state) {
    let sql = "DELETE FROM reports WHERE reports.any_id IN (SELECT `comment`.comment_id FROM `comment` WHERE top_id = ? OR comment_id = ?) AND reports.state =?"
    let params = [any_id, any_id, state]
    return mysqlHelper.execute1(sql, params)
}

//查询评论举报(条件、分页)
Reports.searchReports = function searchReports(reports, commentState, buser_id, busername, Param) {
    let sql = "SELECT r.*, c.content, c.state AS commentState, c.user_id_from AS buser_id, u.username AS busername, COUNT(r.any_id) AS reportsCount " +
        "FROM reports r LEFT JOIN `comment` c ON r.any_id = c.comment_id LEFT JOIN `user` u ON c.user_id_from = u.user_id WHERE r.state = 0 ";
    let params = []

    if (reports.any_id != null && reports.any_id != '') {
        sql = sql + 'AND r.any_id = ? '
        params.push(reports.any_id)
    }
    if (reports.deal != null && reports.deal != '') {
        sql = sql + 'AND deal = ? '
        params.push(reports.deal)
    }
    if (commentState != null && commentState != '') {
        sql = sql + 'AND c.state = ? '
        params.push(commentState)
    }
    if (buser_id != null && buser_id != '') {
        sql = sql + 'AND c.user_id_from =? '
        params.push(buser_id)
    }
    if (busername != null && busername != '') {
        sql = sql + 'AND u.username =? '
        params.push(busername)
    }
    sql = sql + 'GROUP BY r.any_id limit ?, ?'

    params.push((Param.pageNum - 1) * Param.pageSize)
    params.push(Param.pageSize)

    return mysqlHelper.execute1(sql, params)
}

//查询评论举报总页数(条件)
Reports.searchReportsCount = function searchReportsCount(reports, commentState, buser_id, busername) {
    let sql = "select COUNT(*) AS count from (SELECT COUNT(*) FROM reports r LEFT JOIN `comment` c ON r.any_id = c.comment_id LEFT JOIN `user` u ON c.user_id_from = u.user_id WHERE r.state = 0 ";
    let params = []

    if (reports.any_id != null && reports.any_id != '') {
        sql = sql + 'AND r.any_id = ? '
        params.push(reports.any_id)
    }
    if (reports.deal != null && reports.deal != '') {
        sql = sql + 'AND deal = ? '
        params.push(reports.deal)
    }
    if (commentState != null && commentState != '') {
        sql = sql + 'AND c.state = ? '
        params.push(commentState)
    }
    if (buser_id != null && buser_id != '') {
        sql = sql + 'AND c.user_id_from =? '
        params.push(buser_id)
    }
    if (busername != null && busername != '') {
        sql = sql + 'AND u.username =? '
        params.push(busername)
    }
    sql = sql + 'GROUP BY r.any_id)as tmp'
    return mysqlHelper.single1(sql, params)
}

//更改deal
Reports.updataDeal = function updataDeal(deal, any_id) {
    var sql = "UPDATE reports SET deal = ? WHERE any_id = ?";
    let params = [deal, any_id]
    return mysqlHelper.execute1(sql, params)
}


module.exports = Reports;