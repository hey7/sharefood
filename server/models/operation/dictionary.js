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

//查询字典(条件、分页)
Dictionary.searchDictionary = function searchDictionary(dictionary, Param) {
    let sql = "SELECT * FROM dictionary WHERE 1=1 ";
    let params = []

    if (dictionary.dictionary_id != null && dictionary.dictionary_id != '') {
        sql = sql + 'AND dictionary_id=? '
        params.push(dictionary.dictionary_id)
    }
    if (dictionary.top_id != null && dictionary.top_id != '') {
        sql = sql + 'AND top_id=? '
        params.push(dictionary.top_id)
    }
    if (dictionary.upper_id != null && dictionary.upper_id != '') {
        sql = sql + 'AND upper_id=? '
        params.push(dictionary.upper_id)
    }

    if (Param != null && Param != '') {
        sql = sql + 'limit ?, ?'
        params.push((Param.pageNum - 1) * Param.pageSize)
        params.push(Param.pageSize)
    }
    return mysqlHelper.execute1(sql, params)
}

//根据name查询Dictionary
Dictionary.getDictionaryByName = function getDictionaryByName(name,state) {
    let sql = "SELECT * FROM dictionary WHERE upper_id IN ( SELECT dictionary_id FROM dictionary WHERE name = ? ) AND dictionary.state =?"
    let params = [name,state]
    return mysqlHelper.execute1(sql, params)
}

//保存Dictionary
Dictionary.prototype.save = function save() {
    var sql = "INSERT INTO dictionary(dictionary_id,upper_id,name,top_id,state,isLeaf,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?)";
    let params = [this.upper_id, this.name, this.top_id, this.state, this.isLeaf, this.create_time, this.modified_time]
    return mysqlHelper.execute1(sql, params)
}

//更改Dictionary
Dictionary.prototype.updateDictionary = function updateDictionary() {
    let sql = "UPDATE dictionary SET modified_time = ? ";
    let params = []
    params.push(this.modified_time)
    if (this.state != null && this.state != '') {
        sql = sql + ', state = ? '
        params.push(this.state)
    }
    if (this.isLeaf != null && this.isLeaf != '') {
        sql = sql + ', isLeaf = ? '
        params.push(this.isLeaf)
    }
    if (this.name != null && this.name != '') {
        sql = sql + ', name = ? '
        params.push(this.name)
    }

    sql = sql + 'WHERE dictionary_id = ?'
    params.push(this.dictionary_id)

    return mysqlHelper.execute1(sql, params)
}

module.exports = Dictionary;