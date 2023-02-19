const mongoose = require('mongoose');


const matchSchema = mongoose.Schema({
    scoreOne : Number,
    scoreTwo : Number,
    teamOne:String,
    teamTwo : String,
})
const match = mongoose.model("match",matchSchema);

module.exports = match;