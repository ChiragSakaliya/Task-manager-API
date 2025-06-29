const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/project`);

const taskSchema = mongoose.Schema({
    title: {type: String, required:true},
    description: String,
    completed:{type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
{timestamps: true});

module.exports = mongoose.model("task", taskSchema);