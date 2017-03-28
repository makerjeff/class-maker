// The goal here would be to dynamically create and destroy 1. LOGIN, 2. SIGNUP, 3. GROUPS CRUD pages.  (or hide/show).
// Second, dynamically swappable 'pages' to display content.

//TODO: refactor this into a module
// page nav (module)
//  - detect_button(buttonTarget)
//  - switch_page(number)

// ===============================
// GLOBALS =======================
// ===============================

var container = document.getElementById('container');
var page1 = document.getElementById('page_1');
var page2 = document.getElementById('page_2');
var page3 = document.getElementById('page_3');
var page4 = document.getElementById('page_4');


// ===============================
// FUNCTION DEFINITIONS ==========
// ===============================
/**
 * Detect which button was clicked, consolidating to one event listener.
 * @param buttonTarget  Event Target, which is the button.
 */
function detect_button(buttonTarget) {

    // parse button type and number
    var type = buttonTarget.id.split('_').shift();
    var num = buttonTarget.id.split('_').pop();

    // if the type of button is a 'navbutton'
    if(type === 'navbutton') {

        switch(num) {
            case num:
                console.log('button clicked: ' + num);
                switch_page(num);
                break;
            case '':
                console.log('no number detected');
                break;
            default:
                console.log('nothing.');
        }
    }
}

/**
 * Switch to page
 * @param number
 */
function switch_page(number) {
    //try and clear the classlist without disabling err-thang.
    container.classList = '';
    container.classList.add('container', 'turn_to_page_' + number);
}

// ================================
// EVENTS =========================
// ================================

window.addEventListener('click', function(e){
    //e.preventDefault();
    //console.log(e.target.id);
    detect_button(e.target);
});
