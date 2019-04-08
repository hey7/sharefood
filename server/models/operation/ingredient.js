var mysqlHelper = require("../mysqlHelper");

function Ingredient(ingredient) {
    this.ingredient_id = ingredient.ingredient_id;
    this.ingredientname = ingredient.ingredientname;
    this.state = ingredient.state;
    this.introduction = ingredient.introduction;
    this.nutrition = ingredient.nutrition;
    this.effect = ingredient.effect;
    this.apply = ingredient.apply;
    this.taboo = ingredient.taboo;
    this.path = ingredient.path;
    this.season = ingredient.season;
    this.create_time = ingredient.create_time;
    this.modified_time = ingredient.modified_time;
};

//根据IngredientName查询Ingredient
Ingredient.getIngredientByIngredientName = function getIngredientByIngredientName(ingredientname) {
    let sql = "SELECT * FROM ingredient WHERE ingredientname = ?";
    let params = [ingredientname]
    return mysqlHelper.single1(sql, params)
}

//根据IngredientId查询Ingredient
Ingredient.getIngredientByIngredientId = function getIngredientByIngredientId(ingredient_id) {
    let sql = "SELECT * FROM ingredient WHERE ingredient_id = ?";
    let params = [ingredient_id]
    return mysqlHelper.single1(sql, params)
}

//保存食材
Ingredient.prototype.save = function save() {
    var sql = "INSERT INTO ingredient(ingredient_id,ingredientname,state,introduction,nutrition,effect,apply,taboo,path,season,create_time,modified_time) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)";
    let params = [this.ingredientname, this.state, this.introduction, this.nutrition, this.effect, this.apply, this.taboo, this.path, this.season, this.create_time, this.modified_time]
    return mysqlHelper.execute1(sql, params)
}

//查询食材(条件、分页)
Ingredient.searchIngredient = function searchIngredient(ingredient, Param) {
    let sql = "SELECT * FROM ingredient WHERE 1=1 ";
    let params = []
    if (ingredient.ingredient_id != null && ingredient.ingredient_id != '') {
        sql = sql + 'AND ingredient_id=? '
        params.push(ingredient.ingredient_id)
    }
    if (ingredient.ingredientname != null && ingredient.ingredientname != '') {
        sql = sql + 'AND ingredientname=? '
        params.push(ingredient.ingredientname)
    }
    if (ingredient.state != null && ingredient.state != '') {
        sql = sql + 'AND state=? '
        params.push(ingredient.state)
    }
    sql = sql + 'limit ?, ?'

    params.push((Param.pageNum - 1) * Param.pageSize)
    params.push(Param.pageSize)
    return mysqlHelper.execute1(sql, params)
}

//查询食材总页数(条件)
Ingredient.searchIngredientCount = function searchIngredientCount(ingredient) {
    let sql = "SELECT COUNT(*) AS count FROM ingredient WHERE 1=1 ";
    let params = []
    if (ingredient.ingredient_id != null && ingredient.ingredient_id != '') {
        sql = sql + 'AND ingredient_id=? '
        params.push(ingredient.ingredient_id)
    }
    if (ingredient.ingredientname != null && ingredient.ingredientname != '') {
        sql = sql + 'AND ingredientname=? '
        params.push(ingredient.ingredientname)
    }
    if (ingredient.state != null && ingredient.state != '') {
        sql = sql + 'AND state=? '
        params.push(ingredient.state)
    }
    return mysqlHelper.single1(sql, params)
}

//修改菜谱
Ingredient.prototype.update = function update() {
    var sql = "UPDATE ingredient SET ingredientname = ?,state = ?,introduction = ?,nutrition = ?,effect = ?,apply = ? ,taboo = ? ,path = ? ,season = ?, modified_time = ? WHERE ingredient_id = ?";
    let params = [this.ingredientname, this.state, this.introduction, this.nutrition, this.effect, this.apply, this.taboo, this.path, this.season, this.modified_time, this.ingredient_id]
    return mysqlHelper.execute1(sql, params)
}
// //保存食材
// Ingredient.prototype.save = function save(callback) {
//     var sql = "INSERT INTO ingredient(ingredient_id,ingredientname,state) VALUES(0,?,?)";
//     let params = [this.ingredientname,this.state]
//     mysqlHelper.execute(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }

// //根据IngredientName查询Ingredient
// Ingredient.getIngredientByIngredientName = function getIngredientByIngredientName(ingredientname, callback) {
//     let sql = "SELECT * FROM ingredient WHERE ingredientname = ?";
//     let params = [ingredientname]
//     mysqlHelper.single(sql, params, function (err, result) {
//         callback(err, result);
//     })
// }


module.exports = Ingredient;