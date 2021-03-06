/**
 * Official-ish Lunch Run Server on HTTPS.
 * Created by jeffersonwu on 3/22/17.
 */

// ====================
// MODULES ============
// ====================

const fs                = require('fs');
const http              = require('http');
const https             = require('https');

const hskey = fs.readFileSync(process.cwd() + '/hacksparrow-key.pem');
const hscert = fs.readFileSync(process.cwd() + '/hacksparrow-cert.pem');

const credentials       = {key: hskey, cert: hscert};
const express           = require('express');
const app               = express();

const httpServer        = http.createServer(app);
const httpsServer       = https.createServer(credentials, app);

const chalk             = require('chalk');
const clear             = require('clear');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const bcrypt            = require('bcrypt-nodejs');

const jwt               = require('jsonwebtoken');
const cookieParser      = require('cookie-parser');

// custom modules -----
const crypto            = require('./modules/crypto');

// --------------------
// MONGOOSE MODELS ----

const User              = require('./models/User');
const Bear              = require('./models/Bear');

// ====================
// CONFIGURATION ======
// ====================

const tokencreds        = {jwtSecret: 'jwtsecret12345', cookieSecret: 'cookiesecret12345', dummyToken: '1a2b3c4d5e6f'};

const port              = process.env.PORT || 3443;

const token_duration    = '15m';

// mongoose setup and events
mongoose.connect('mongodb://localhost/lrdb');  //experimental db

mongoose.connection.on('error', function(err){
    console.error('connection error: ' + err);
});

mongoose.connection.on('connected', function(){
    console.log(chalk.green('Database connected.'));
});

mongoose.connection.on('disconnected', function(){
    console.log('Database connection disconnected.');
});



// =====================
// MIDDLEWARE ==========
// =====================

// --- powered by ---
// --- silly headers ---
app.use(function(req, res, next){
    res.setHeader('X-Powered-By', 'Monkeys in Space v0.0.1');
    next();
});

// --- enable body parser ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// --- Cookies ---
app.use(cookieParser(tokencreds.cookieSecret));

// --- basic logger ---
app.use(function(req, res, next){
    console.log(new Date() + ' ' + req.method + ' ' + req.url + ' ');
    next();
});

// --- auth checker ---
//TODO: working, but obscuring everything.
// TODO: create another Router object for sensitive data put this in there.
app.use(function(req, res, next) {
    token_to_verify = req.signedCookies.token;
    console.log('Token in signed cookie: ' + chalk.blue(token_to_verify));

    jwt.verify(token_to_verify, tokencreds.jwtSecret, function(err, decoded){
        if(err) {
            console.log('error verifying token. ');
            res.status(403);
            res.sendfile(process.cwd() + '/public/login.html');
        } else {
            next();
        }
    });
});

// =====================
// ROUTES ==============
// =====================

app.get('/', function(req, res){
    // res.send("<h1>YAY-P-I</h1> <p>Welcome to the host page.  To use the api, use the route api/:route</p>");
    console.log('Entry into site.');
    res.sendFile(process.cwd() + '/public/index.html');
});


// === CUSTOM ROUTER OBJECT ====

// --- Router Middleware ---
var router = express.Router();

// every-route middleware.
router.use(function(req, res, next){
    console.log('Something is happening...');
    next();
});



// --- Router Routes ----
router.get('/', function(req, res){
    console.log('api base route working!');
    res.json({status: 'success', payload: {message: 'api base route working!'}});
});

// EXPERIMENTAL COOKIE SETTER VIA AJAX
router.get('/setcookie', function(req, res) {
    res.cookie('token', tokencreds.dummyToken, {signed: true, httpOnly: true});
    res.json({status: 'success', payload: {message: 'autho cookie set. '}});
});

router.get('/readcookie', function(req, res) {

    if(req.signedCookies.token != undefined) {
        console.log('recognized cookie: ' + req.signedCookies.token);

        res.json({status: 'success', payload: {message: 'your signed cookie: ' + req.signedCookies.token}});
    } else {
        console.log(chalk.red('cookie is not available'));
        res.json({status: 'failed', payload: {message: 'failed to authenticate. '}});
    }
});

router.get('/clearcookie', function(req, res) {
    res.clearCookie('token');
    console.log('token cookie cleared, AKA logged out. ');
    res.json({status: 'success', payload: {message:'Token cookie cleared. '}});
});

// EXPERIMENTAL
router.get('/debug', function(req, res){

    token_to_verify = req.signedCookies.token;
    console.log('Token in signed cookie: ' + chalk.blue(token_to_verify));

    // TODO: WRAP THIS INTO A "CHECK TOKEN" FUNCTION
    jwt.verify(token_to_verify, tokencreds.jwtSecret, function(err, decoded){
        if(err) {
            console.log('error verifying token. ');
            res.status(403);
            res.send('Error verifying token. ');
        } else {

            res.status(200);
            console.log('Your user ID: ' + decoded);

            for (prop in decoded) {
                console.log(prop + ': ' + decoded[prop]);
            }

            res.json({status: 'success', payload: {message: 'User ID sent. ', user: decoded.user, friends: decoded.friends}});
        }
    });
});

// =============================================
// USER CREATE / GET ROUTE =====================

// TODO: API: login. Returns JWT as a cookie as well as a payload.
router.post('/authenticate', function(req, res){
    console.log('/authenticate route hit. ');

    // TODO: WRAP THIS INTO A 'LOGIN CHECK' FUNCTION
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error: ' + err);
            res.send('error: ' + err);
        } else {

            // 1) Check for user and retrieve hashed password.
            if(user != null) {
                console.log(chalk.green('user: ' + user.email));
                console.log(chalk.green('password to check against: ' + user.password));

                //2) crypto check password.
                bcrypt.compare(req.body.password, user.password, function(err, result){
                    if(err) {
                        console.log('error with password processing...');
                        res.status(500);
                        res.send('error with password checking...');
                    } else {
                        // if password matches, send cookie and token
                        if(result == true) {

                            // 3) Create JSON Web Token for the current user, with user-email and any 'I need right now' data.
                            jwt.sign({ user: user.email, friends: ['i', 'have', 'no', 'friends']}, tokencreds.jwtSecret, {expiresIn: token_duration}, function(err, token){

                                if (err) {
                                    res.status(500);
                                    res.send('Error creating token. Contact your administrator. ');
                                } else {

                                    console.log('token: ' + chalk.yellow(token));
                                    res.status(200);
                                    res.cookie('token', token, {signed: true, httpOnly: true});
                                    res.json({status: 'success', payload: {message: 'autho cookie set. ', token: token }});
                                }
                            });

                        } else {
                            res.status(401);
                            res.json({status: 'failed', payload: {message: 'user password does not match. '}});
                        }
                    }
                });

            } else {
                console.log('user not found!');
                res.status(422);    // status 422: unprocessable entity
                res.json({status: 'failed', payload: {message: 'user with email ' + req.body.email + ' not found!'}});
            }

        }
    });


});

// TODO: API: signup. Creates new user and returns JWT as a cookie as well as a payload.
router.post('/signup', function(req, res){
    //DEBUG
    console.log(req.body.email + ' ' + req.body.password);

    //TODO: email validation (make sure the format fits abcd@180la.com)
    //check to see if user exists
    User.findOne({email: req.body.email}, function(err, result){
        // If there is an error (not if anything's been found
        if(err) {
            console.log('error: ' + err);
            res.send('error: ' + err);

        } else {

            // check to see if the user found is null... if it is, there's no user so save away.
            //console.log('user found: ' + result);
            //res.send('user found: '+ result);

            if(result == null) {

                new User({email: req.body.email, password: req.body.password}).save(function(err){
                    if(err) {
                        console.log('error saving to database. ' + err);
                        res.send('error saving to database. ');
                    } else {
                        // properly saved, now create JWT and set cookie.
                        res.status(201);
                        console.log('new user saved.');
                        res.send('new user saved.');

                        //TODO: Create JWT, using encapsulated function from above.
                    }
                });


            } else {
                console.log('user already exists!');
                res.status(409);
                res.send('user already exists!');

                //TODO: res.json error message.
            }
        }
    });
});

// =============================================
// INDIVIDUAL USER ROUTES ======================



// =============================================
// REGISTER ROUTE ==============================
app.use('/api', router);

// =============================


// ======================
// CATCH-ALL MIDDLEWARE =
// ======================

// static file server
app.use(express.static('public/'));

app.use(function(req, res, next){
    res.status(404);
    res.send('404: Resource not found!');
});

app.use(function(req, res, next){
    res.status(500);
    res.send('500: Server error!');
});

// =======================
// ==== START SERVER =====
// =======================

httpsServer.listen(port, function(err){
    if(err){
        console.log('http: ' + Error('Error: ' + err));
    } else {
        clear();
        console.log(chalk.blue('HTTPS: MP-Server started on port ' + port));
        console.log('Port: ' + process.env.PORT);
        console.log('Crypto password (temp): ' + crypto.password);
    }
});


// =======================
// CUSTOM FUNCTIONS ======
// =======================
