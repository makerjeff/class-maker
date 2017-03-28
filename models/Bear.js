/**
 * Created by jefferson.wu on 2/27/17.
 * Part of Scotch.IO restful API tutorial.
 */

const mongoose = require('mongoose');

const BearSchema =  mongoose.Schema({
    name: {type: String, required: true, unique: true},
    age: Number
});

var Bear = mongoose.model('Bear', BearSchema);

module.exports = Bear;
