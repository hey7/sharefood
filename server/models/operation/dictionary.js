var mysqlHelper = require("../mysqlHelper");

function Dictionary(dictionary) {
    this.dictionary_id = dictionary.dictionary_id;
    this.upper_id = dictionary.upper_id;
    this.name = dictionary.name;
    this.top_id = dictionary.top_id;
    this.state = dictionary.state;
};

//根据name查询Dictionary
Dictionary.getDictionaryByName = function getDictionaryByName(name) {
    let sql = "SELECT * FROM dictionary WHERE upper_id IN ( SELECT dictionary_id FROM dictionary WHERE name = ? )"
    let params = [name]
    return mysqlHelper.execute1(sql, params)
}

module.exports = Dictionary;