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



module.exports = Reports;