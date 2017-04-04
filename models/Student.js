/**
 * Created by jefferson.wu on 2/16/17.
 */

// 0 - 10 scale, 0 being horrible, 10 being a saint.
var StudentProto = {
    student_id: 1023024141,
    firstname: 'jefferson',
    lastname: 'wu',
    stats: {
        'behavior': 3,
        'math': 5,
        'english': 4,
        'science': 2
    }
};


// grab the tools
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
    user: {type: String, required: true, lowercase: true},
    student_id: {type: Number, required: true},
    firstname: {type: String, required: true, lowercase: true},
    lastname: {type: String, required: true, lowercase: true},
    stats: {
        behavior: {type: Number},
        math: {type: Number},
        english: {type: Number},
        science: {type: Number}
    }

});


// create a model that uses schema (schema is useless without a model)
var Student = mongoose.model('Student', studentSchema);

//export model
module.exports = Student;