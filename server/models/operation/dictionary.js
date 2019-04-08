var mysqlHelper = require("../mysqlHelper");

function Dictionary(dictionary) {
    this.dictionary_id = dictionary.dictionary_id;
    this.upper_id = dictionary.upper_id;
    this.name = dictionary.name;
    this.top_id = dictionary.top_id;
    this.state = dictionary.state;
    this.isLeaf = dictionary.isLeaf;
    this.create_time = dictionary.create_time;
    this.modified_time = dictionary.modified_time;
};

//根据name查询Dictionary
Dictionary.getDictionaryByName = function getDictionaryByName(name) {
    let sql = "SELECT * FROM dictionary WHERE upper_id IN ( SELECT dictionary_id FROM dictionary WHERE name = ? )"
    let params = [name]
    return mysqlHelper.execute1(sql, params)
}

//查询所有顶级分类
Dictionary.getTopDictionary = function getTopDictionary() {
    let sql = "SELECT * FROM dictionary WHERE top_id=0"
    let params = []
    return mysqlHelper.execute1(sql, params)
}

//根据topid查询Dictionary
Dictionary.getDictionaryByTopid = function getDictionaryByTopid(top_id) {
    let sql = "SELECT * FROM dictionary WHERE top_id = ?"
    let params = [top_id]
    return mysqlHelper.execute1(sql, params)
}
//根据upperid查询Dictionary
Dictionary.getDictionaryByUpperid = function getDictionaryByUpperid(upper_id) {
    let sql = "SELECT * FROM dictionary WHERE upper_id = ?"
    let params = [upper_id]
    return mysqlHelper.execute1(sql, params)
}
//根据dictionary_id查询Dictionary
Dictionary.getDictionaryByDictionaryid = function getDictionaryByDictionaryid(dictionary_id) {
    let sql = "SELECT * FROM dictionary WHERE dictionary_id = ?"
    let params = [dictionary_id]
    return mysqlHelper.single1(sql, params)
}

//保存Dictionary
Dictionary.prototype.save = function save() {
    var sql = "INSERT INTO dictionary(dictionary_id,upper_id,name,top_id,state,isLeaf,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?)";
    let params = [this.upper_id, this.name, this.top_id, this.state, this.isLeaf, this.create_time, this.modified_time]
    return mysqlHelper.execute1(sql, params)
}

//更改DictionaryState
Dictionary.updateState = function updateState(state, modified_time, dictionary_id) {
    var sql = "UPDATE dictionary SET state = ?,modified_time = ? WHERE dictionary_id = ?";
    let params = [state, modified_time, dictionary_id]
    return mysqlHelper.execute1(sql, params)
}
//更改DictionaryisLeaf
Dictionary.updateisLeaf = function updateisLeaf(isLeaf, dictionary_id) {
    var sql = "UPDATE dictionary SET isLeaf = ? WHERE dictionary_id = ?";
    let params = [isLeaf, dictionary_id]
    return mysqlHelper.execute1(sql, params)
}
//更改DictionaryName
Dictionary.updateName = function updateName(name, modified_time, dictionary_id) {
    var sql = "UPDATE dictionary SET name = ?,modified_time = ? WHERE dictionary_id = ?";
    let params = [name, modified_time, dictionary_id]
    return mysqlHelper.execute1(sql, params)
}
module.exports = Dictionary;