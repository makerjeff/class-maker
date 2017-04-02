/**
 * Created by jefferson.wu on 3/30/17.
 */


// LOGIN LOGIC
var login_form = document.getElementById('loginForm');
var button = document.getElementById('login_button');


login_form.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('resultDiv').innerHTML = '';   //clear the page
    submit_login(document.getElementById('login_email').value, document.getElementById('login_password').value);
});
