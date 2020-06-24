var mongoose = require("mongoose");
var todoSchema = mongoose.Schema({
    todo: { 
        type: String, 
        required: true, 
        unique: true 
    }
})

var Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;