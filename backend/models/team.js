const mongoose = require('mongoose');



const teamSchema = mongoose.Schema({
name: String,
owner: String,
stadium: String,
foundation: Number,
});

const team = mongoose.model("team", teamSchema);

module.exports= team;