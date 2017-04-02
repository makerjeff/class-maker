/**
 * Created by jefferson.wu on 3/30/17.
 */

// SIGNUP LOGIC
var signup_form = document.getElementById('signup_form');
var signup_email = document.getElementById('signup_email');
var signup_password = document.getElementById('signup_password');
var confirm_signup_password = document.getElementById('confirm_signup_password');



// ADD EVENT LISTENERS
signup_password.addEventListener('change', function(e){
    validate_email(signup_password, confirm_signup_password);
});

confirm_signup_password.addEventListener('keyup', function(e){
    validate_email(signup_password, confirm_signup_password);
});

signup_form.addEventListener('submit', function(e){
    e.preventDefault();
    submit_new_user(signup_email.value, signup_password.value);
});