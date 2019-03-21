module.exports.getNowFormatDate = function getNowFormatDate() { //现在时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (h >= 1 && h <= 9) {
        h = '0' + h
    }
    if (m >= 0 && m <= 9) {
        m = '0' + m
    }
    if (s >= 0 && s <= 9) {
        s = '0' + s
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        ' ' + h + seperator2 + m +
        seperator2 + s
    return currentdate;
}
module.exports.getFormatDate = function getFormatDate(dateParameter, status) { // status:  0为日期+时间   1为日期
    var date = new Date(dateParameter)
    var seperator1 = '-'
    var seperator2 = ':'
    var month = date.getMonth() + 1
    var strDate = date.getDate()

    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()

    var currentdate
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    if (h >= 1 && h <= 9) {
        h = '0' + h
    }
    if (m >= 0 && m <= 9) {
        m = '0' + m
    }
    if (s >= 0 && s <= 9) {
        s = '0' + s
    }
    if (status.toString() === '0') {
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + h + seperator2 + m +
            seperator2 + s
    }
    if (status.toString() === '1') {
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    }
    return currentdate
}