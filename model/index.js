let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    mobileno: { type: String },
    UserLogin: {
        EmailId: { type: String },
        Password: {type: String}
     }
       
});

let User = mongoose.model("users", userSchema);

module.exports = User;