/**
 * Created by jeffersonwu on 4/2/17.
 */

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