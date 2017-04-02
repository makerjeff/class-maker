/**
 * Created by jefferson.wu on 3/29/17.
 */

    // VARS -------------
var token;

// LOCAL FUNCTIONS ---------

/**
 * Dynamically create the elements of a sign up page.
 * @param target_div    Target div to append to (resultDiv, resultDiv2, etc)
 */
function create_signup_page(target_div){
    // create form
    var form = document.createElement('form');
    form.id = 'mainForm';
    form.classList.add('mainForm');

    // create email input
    var email_label = document.createElement('label');
    email_label.htmlFor = 'email';
    email_label.innerHTML = 'email';

    var email_input = document.createElement('input');
    email_input.id = 'email';
    email_input.type = 'text';
    email_input.name = 'email';
    email_input.required = true;
    email_input.autocomplete = true;
    email_input.placeholder = '180LA email address';

    // create password input
    var pwd_label = document.createElement('label');
    pwd_label.htmlFor = 'password';
    pwd_label.innerHTML = 'password';

    var password_input = document.createElement('input');
    password_input.id = 'password';
    password_input.type = 'password';
    password_input.name = 'password';
    password_input.placeholder = 'password';
    password_input.required = true;

    // create password confirm
    var confirm_label = document.createElement('label');
    confirm_label.htmlFor = 'confirm_password';
    confirm_label.innerHTML = 'confirm';

    var confirm_input = document.createElement('input');
    confirm_input.id = 'confirm_password';
    confirm_input.type = 'password';
    confirm_input.name = 'confirm_password';
    confirm_input.placeholder = 'confirm password';
    confirm_input.required = true;

    // create submit button
    var submit_button = document.createElement('button');
    submit_button.id = 'submitButton';
    submit_button.type = 'submit';

    var submit_button_text = document.createTextNode('create new user');
    submit_button.appendChild(submit_button_text);

    var br = document.createElement('br');
    var br2 = document.createElement('br');
    var br3 = document.createElement('br');

    // APPEND TO TARGET DIV ---------------
    form.appendChild(email_label);
    form.appendChild(email_input);
    form.appendChild(br);
    form.appendChild(pwd_label);
    form.appendChild(password_input);
    form.appendChild(br2);
    form.appendChild(confirm_label);
    form.appendChild(confirm_input);
    form.appendChild(br3);
    form.appendChild(submit_button);

    // ADD EVENT LISTENERS
    password_input.addEventListener('change', function(e){
        validate_email(password_input, confirm_input);
    });

    confirm_input.addEventListener('keyup', function(e){
        validate_email(password_input, confirm_input);
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        submit_new_user(email_input.value, password_input.value);
    });

    // append Form to Div.
    target_div.appendChild(form);
}

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
            target_div.innerHTML = '<h3>User Authenticated! </h3> <p><b>Your user id: </b>' +  info_object.payload.user + '</p>' +
                '<b>Your friends: </b>' + info_object.payload.friends;
            console.log('User has been successfully authenticated. Should have been given a cookie.');
            window.location.href = '/';
            break;
        case 201:
            target_div.innerHTML = '<h3>New User created. </h3>';
            console.log('User created. Process JWT cookie and move on. ');
            //TODO: store token here
            //TODO: redirect to index here.
            window.url.href = '/index.html';
            break;
        case 401:
            //target_div.innerHTML = '<h3>User authentication check failed. Password incorrect (hide in production)</h3>';
            //TODO: put this in a function
            document.getElementById('login_email').classList.add('wrong');
            document.getElementById('login_password').classList.add('wrong');

            // create modal
            //AlertModalMaker.create('error', info_object.payload.message, document.getElementById('container'));
            AlertModalMaker.create('error', 'User authentication check failed. Password incorrect. (hide in production)', document.getElementById('container'));


            break;
        case 403:
            target_div.innerHTML = '<h3>User is not authenticated. Try logging in first. </h3>';
            console.log('User is not authenticated. Try logging in first. ');
            break;
        case 409:
            target_div.innerHTML = '<h3>User already exists.</h3>';
            document.getElementById('signup_email').classList.add('exists');

            //TODO: put this into a 'warning' div
            AlertModalMaker.create('warning', info_object.payload.message, document.getElementById('container'));


            console.log('User already exists. Use this to drive visual feedback. ');
            break;
        case 422:
            target_div.innerHTML = '<h3>Authentication failed. Incorrect email or password. </h3>';
            console.log('Authentication failed. Incorrect email or password. ');
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
        url: '/api/signup',
        data: {email: clean_email, password: clean_pwd},
        success: function(data, status, jqxhr) {
            handle_response(jqxhr, data, document.getElementById('resultDiv'));
        },
        error: function(jqxhr, status, err) {
            handle_response(jqxhr, err, document.getElementById('resultDiv'));
        }
    });
}

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

    console.log('clean username: ' + input_email + ', clean password: ' + input_pwd);

    $.ajax({
        method: 'POST',
        url: '/api/authenticate',
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


// EVENTS --------------------

// MAIN LOOP
window.addEventListener('load', function(e){
    //create_signup_page(document.getElementById('resultDiv'));
});

// DETECT ORIENTATION ON MOBILE
var landscape_veil = document.getElementById('landscape_veil');

window.addEventListener('orientationchange', function(e){


});





