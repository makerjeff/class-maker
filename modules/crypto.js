/**
 * Created by jefferson.wu on 3/1/17.
 */

const crypto        = require('crypto');
const algorithm     = 'aes-256-ctr';
const password      = process.env.PASSWORD || 'password12345'; //for RnD, 'password12345'

// encrypt text
function encrypt(text){
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex'); //cipher.final closes the process. can't reuse cipher.
    return crypted;
}

// decrypte text
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm, password);
    var decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// export modules.
module.exports.password = password;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;