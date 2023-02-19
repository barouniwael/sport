const mongoose = require('mongoose');




const playerSchema = mongoose.Schema({
name :String,
age: Number,
position : String,
nbr : Number,
img:String,
});

const player = mongoose.model("player", playerSchema);

module.exports = player;