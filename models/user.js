const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/project`);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Tasks: [{type: mongoose.Schema.Types.ObjectId, ref:"task"}],
});

module.exports = mongoose.model("user", userSchema);