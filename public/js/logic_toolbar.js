/**
 * Created by jeffersonwu on 4/2/17.
 */

// store the user's data object globally (no confidental data)
var user_data_object;

var toolbar_menu_button = document.getElementsByClassName('menuButton')[0];
var menu = document.getElementsByClassName('menu')[0];
var modal_veil = document.getElementsByClassName('modal_veil')[0];

// TEMP ITEMS, that will be created dynamically.
var menu_list_array = document.querySelectorAll('.menu > ul > li');


// toolbar click
toolbar_menu_button.onclick = function(e) {
    console.log('toolbar menu button has been clicked.');
    toggle_menu();
};

// if veil is clicked, hide the menu.
modal_veil.onclick = function(e){
    console.log('veil has been clicked');
    toggle_menu();
};

// TOGGLE MAIN MENU
function toggle_menu() {
    if(menu.classList.contains('hide')) {
        menu.classList.remove('hide');
        modal_veil.classList.remove('hide');
    } else {
        menu.classList.add('hide');
        modal_veil.classList.add('hide');
    }
}

// SETUP (DOM content loaded.)
document.addEventListener('DOMContentLoaded', function(e){
    toggle_menu();
    get_current_user_data();
});

// MAIN LOOP (run after everything has loaded)
window.addEventListener('load', function(e){
    //
    menu_list_array.forEach(function(elem,ind,arr) {

        if (elem.innerHTML == 'Log Out') {
            elem.onclick = function(e) {
                logout();
                toggle_menu();
            }
        }

        else if (elem.innerHTML == '(email)') {
            elem.innerHTML = user_data_object.user;

        } else {
            elem.onclick = function(e) {
                console.log('menu item clicked: ' + elem.innerHTML);
                toggle_menu();
            };
        }
    });
});


function logout() {
    $.ajax({
        method: 'GET',
        url: '/api/clearcookie',
        success: function(data, status, jqxhr){
            console.log('logged out. ');
            window.location.href = '/';
        },
        error: function(jqxhr, status, err) {
            console.log('error logging out. ');
        }
    });
}

function get_current_user_data() {
    $.ajax({
        method: 'GET',
        url: '/api/user_data',
        success: function(data, status, jqxhr) {
            user_data_object = data.payload;
            console.log(user_data_object);
        },
        error: function(jqxhr, status, err){
            console.log('error getting user data. ');
        }
    });
}

