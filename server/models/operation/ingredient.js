var mysqlHelper = require("../mysqlHelper");

function Ingredient(ingredient) {
    this.ingredient_id = ingredient.ingredient_id;
    this.ingredientname = ingredient.ingredientname;
    this.state = ingredient.state;
};

//根据IngredientName查询Ingredient
Ingredient.getIngredientByIngredientName = function getIngredientByIngredientName(ingredientname) {
    let sql = "SELECT * FROM ingredient WHERE ingredientname = ?";
    let params = [ingredientname]
    return mysqlHelper.single1(sql, params)
}

//保存食材
Ingredient.prototype.save = function save() {
    var sql = "INSERT INTO ingredient(ingredient_id,ingredientname,state) VALUES(0,?,?)";
    let params = [this.ingredientname,this.state]
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