/**
 * Created by jefferson.wu on 3/29/17.
 */

    // VARS -------------
var token;

// LOCAL FUNCTIONS ---------



/**
 * Check to ensure both password and confirm-password fields are matching.
 * @param passwd    Password textfield element (value is pulled from within the function).
 * @param confirm   Confirm-Password textfield element (value is pulled from within the function).
 */
function validate_email(passwd, confirm) {
    if(passwd.value != confirm.value) {
        confirm.setCustomValidity('Passwords do not match!');
    } else {
        confirm.setCustomValidity('');
    }
}

//TODO: put token storage logic here.

/**
 * Parse and handle the response from XHR.
 * @param xhr_object    JQXHR Object.
 * @param info_object   Data or Error object.
 * @param target_div    Target DOM element to append info to.
 */
function handle_response(xhr_object, info_object, target_div) {
    console.log('xhr object status: ' + xhr_object.status);
    console.log('info object: ' + info_object);

    switch(xhr_object.status) {

        case 200:
            console.log('User has been successfully authenticated. Should have been given a cookie.');
            window.location.href = '/';
            break;

        case 201:
            AlertModalMaker.create('success', 'Account created. ', document.getElementById('container'));
            console.log('User created. Process JWT cookie and move on. ');
            //TODO: store token here
            //TODO: redirect to index here.
            window.location.href = '/index.html';
            break;

        case 401:
            //TODO: put this in a function
            document.getElementById('login_email').classList.add('wrong');
            document.getElementById('login_password').classList.add('wrong');

            // create modal
            AlertModalMaker.create('error', 'User authentication check failed. Password incorrect. (hide in production)', document.getElementById('container'));
            break;

        case 403:
            target_div.innerHTML = '<h3>User is not authenticated. Try logging in first. </h3>';
            console.log('User is not authenticated. Try logging in first. ');
            break;

        case 409:
            document.getElementById('signup_email').classList.add('exists');
            AlertModalMaker.create('warning', 'User already exists!', document.getElementById('container'));
            break;

        case 422:
            console.log('No user with that account found. ');
            AlertModalMaker.create('error', 'No user with that account found.', document.getElementById('container'));
            break;

        default:
            target_div.innerHTML = '<h3>Unknown error.</h3>';
            console.log('Default error. ');
    }
}

/**
 * Submit new user data to the API.
 * @param input_email   Email string (gets cleaned, even if HTML5 email type field isn't supported).
 * @param input_pwd     Password string (Spaces get removed).
 */
function submit_new_user(input_email, input_pwd) {

    // CLEAN EMAIL
    var clean_email = input_email;
    clean_email = clean_email.replace(/\\/g, '');       // strip backslashes
    clean_email = clean_email.replace(/\{\}/g, '');     // strip backslashes (again?)
    clean_email = clean_email.replace(/\s\s+/g, '');    // strip spaces
    clean_email = clean_email.replace(/\s$/g, '');      // strip trailing spaces
    clean_email = clean_email.replace(/^\s/g, '');      // strip strip leading spaces

    // CLEAN PW (strip out spaces)
    var clean_pwd = input_pwd;
    clean_pwd = clean_pwd.replace(/\s\s+/g, '');        // strip spaces
    clean_pwd = clean_pwd.replace(/\s$/g, '');          // strip trailing spaces
    clean_pwd = clean_pwd.replace(/^\s/g, '');          // strip leading spaces

    console.log('clean username: ' + clean_email + ', clean password: ' + clean_pwd);

    $.ajax({
        method: 'POST',
        url: '/signup',
        data: {email: clean_email, password: clean_pwd},
        success: function(data, status, jqxhr) {
            handle_response(jqxhr, data, document.getElementById('resultDiv'));
        },
        error: function(jqxhr, status, err) {
            handle_response(jqxhr, err, document.getElementById('resultDiv'));
        }
    });
}

/**
 * Submit Login information for processing.
 * @param input_email   Email.
 * @param input_pwd     Password.
 */
function submit_login(input_email, input_pwd){
    // CLEAN EMAIL
    var clean_email = input_email;
    clean_email = clean_email.replace(/\\/g, '');       // strip backslashes
    clean_email = clean_email.replace(/\{\}/g, '');     // strip backslashes (again?)
    clean_email = clean_email.replace(/\s\s+/g, '');    // strip spaces
    clean_email = clean_email.replace(/\s$/g, '');      // strip trailing spaces
    clean_email = clean_email.replace(/^\s/g, '');      // strip strip leading spaces

    // CLEAN PW (strip out spaces)
    var clean_pwd = input_pwd;
    clean_pwd = clean_pwd.replace(/\s\s+/g, '');        // strip spaces
    clean_pwd = clean_pwd.replace(/\s$/g, '');          // strip trailing spaces
    clean_pwd = clean_pwd.replace(/^\s/g, '');          // strip leading spaces

    console.log('Debug: clean username: ' + input_email + ', clean password: ' + input_pwd);

    $.ajax({
        method: 'POST',
        url: '/authenticate',
        data: {email: clean_email, password: clean_pwd},
        success: function(data, status, jqxhr) {
            console.log('from ajax: ');
            console.log(data);
            handle_response(jqxhr, data, document.getElementById('resultDiv'));
        },
        error: function(jqxhr, status, err) {
            handle_response(jqxhr, err, document.getElementById('resultDiv'));
            console.log('from ajax: ');
            console.log(err);
        }
    });
}

// STUDENTS --------------------
/**
 * Submit new Student data to the API.
 * @param student_id   Student ID.
 * @param firstname     Student first name.
 * @param lastname      Student last name.
 * @param stats_object  Object that houses student stats.
 */
function submit_new_student(student_id, firstname, lastname, stats_object) {

    $.ajax({
        method: 'POST',
        url: '/signup',
        data: {
            student_id: student_id,
            firstname: firstname,
            lastname: lastname,
            stats: {
                behavior: stats_object.behavior,
                math: stats_object.math,
                english: stats_object.english,
                science: stats_object.science
            }
        },
        success: function(data, status, jqxhr) {
            handle_response(jqxhr, data, document.getElementById('resultDiv'));
        },
        error: function(jqxhr, status, err) {
            handle_response(jqxhr, err, document.getElementById('resultDiv'));
        }
    });
}


// EVENTS --------------------

// MAIN LOOP
window.addEventListener('load', function(e){
    //create_signup_page(document.getElementById('resultDiv'));
});

// DETECT ORIENTATION ON MOBILE
var landscape_veil = document.getElementById('landscape_veil');

window.addEventListener('orientationchange', function(e){


});





