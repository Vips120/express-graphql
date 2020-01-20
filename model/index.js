let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String }
});

let User = mongoose.model("users", userSchema);

module.exports = User;