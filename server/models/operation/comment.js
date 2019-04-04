var mysqlHelper = require("../mysqlHelper");

function Comment(comment) {
    this.comment_id = comment.comment_id;
    this.any_id = comment.any_id;
    this.user_id = comment.user_id;
    this.user_id_from = comment.user_id_from;
    this.user_id_to = comment.user_id_to;
    this.state = comment.state;
    this.top_id = comment.top_id;
    this.content = comment.content;
    this.ban = comment.ban;
    this.create_time = comment.create_time;
};

//添加评论
Comment.prototype.save = function save() {
    var sql = "INSERT INTO comment(comment_id,any_id,user_id,user_id_from,user_id_to,state,top_id,content,ban,create_time) VALUES(0,?,?,?,?,?,?,?,?,?)";
    let params = [this.any_id, this.user_id, this.user_id_from, this.user_id_to, this.state, this.top_id, this.content, this.ban, this.create_time]
    return mysqlHelper.execute1(sql, params)
}
//查询评论
Comment.search = function search(state, any_id) {
    var sql = "SELECT c.*, u1.username AS user_id1, u2.username AS user_id_from1, u3.username AS user_id_to1, u2.photo " +
        "FROM `comment` c LEFT JOIN `user` u1 ON u1.user_id = c.user_id LEFT JOIN `user` u2 ON u2.user_id = c.user_id_from " +
        "LEFT JOIN `user` u3 ON u3.user_id = c.user_id_to WHERE (c.ban = 0 OR c.ban = 1) AND c.state = ? AND any_id = ? ORDER BY create_time";
    let params = [state, any_id]
    return mysqlHelper.execute1(sql, params)
}
//删除评论
Comment.deleteComment = function deleteComment(comment_id) {
    var sql = "DELETE FROM `comment` WHERE `comment`.comment_id = ? OR `comment`.top_id= ?";
    let params = [comment_id, comment_id]
    return mysqlHelper.execute1(sql, params)
}


module.exports = Comment;