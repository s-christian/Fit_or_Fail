const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    },
    members: [ObjectId],  // an array of Users
    creation_date: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    },
});

module.exports = Team = mongoose.model('Team', TeamSchema);
