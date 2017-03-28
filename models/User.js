/**
 * Created by jefferson.wu on 2/16/17.
 */

var UserProto = {
    email: 'jefferson.wu@180la.com',
    firstname: 'jefferson',
    lastname: 'wu',
    groups:
        [
            {
                name:'a group name',
                members: ['user1._id', 'user2._id', 'user3._id', 'user4._id'],
            }
        ]
    // No 'friends' list for MVP, aimed at helping working professionals in your office.
};


// grab the tools
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    groups: {type: Array}
});
// var userSchema = new Schema({
//     name: String,
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     admin: Boolean,
//     location: String,
//     meta: {
//         age: Number,
//         website: String
//     },
//     created_at: Date,
//     updated_at: Date
// });

// create schema methods


// userSchema.methods.dudify = function() {
//     this.name = this.name + '-dude';
//     return this.name;
// };

// ==== EXAMPLE OF A SCHEMA 'PRE' METHOD ====
// userSchema 'pre' method to run before every save.
userSchema.pre('save', function(next){

    var user = this;

    // only hash password if it's been modified or new.
    if(!user.isModified('password')) {

        return next();

    } else {

        bcrypt.hash(user.password, null, null, function(err, hash){
            if(err) {

                return next(err);

            } else {

                // override password with hash.
                user.password = hash;

                // neeeeeeext.
                next();
            }
        });
    }
});

//TODO: add pre-method that automatically creates a firstname last name based on email.

//TODO: add pre-method that pre-populates group, etc.

// create a model that uses schema (schema is useless without a model)
var User = mongoose.model('User', userSchema);

//export model
module.exports = User;