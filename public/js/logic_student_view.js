/**
 * Created by jefferson.wu on 4/4/17.
 */

var student_form_container = document.getElementById('student_form_container');
var student_form_veil = document.getElementById('student_form_veil');
var student_form_cancel_button = document.getElementById('student_form_cancel_button');
var student_form_save_button = document.getElementById('student_form_save_button');


var add_student_button = document.getElementById('add_button');

// FUNCTIONS ----------------
function update_view(data_object, target_div) {

    data_object.forEach(function(elem, ind, arr){

        var self = this;

        // CREATES & ASSIGNS -------
        var div = document.createElement('div');
        div.id = data_object[ind].student_id;

        var img = document.createElement('img');
        img.src = 'images/penguin_sm.jpg';

        var score_div = document.createElement('div');
        score_div.classList.add('score');

        var close_button = document.createElement('div');
        close_button.classList.add('close_button', 'fa', 'fa-times-circle', 'fa-2x');

        // DATA CHECK
        score_div.innerHTML = get_average_score(data_object[ind]);


        var name_div = document.createElement('div');
        score_div.classList.add('name');
        name_div.innerHTML = data_object[ind].firstname + ' ' + data_object[ind].lastname;

        // EVENT LISTENERS --------
        div.onclick = function(e) {
            console.log(div.id);

            //TODO: wrap into an 'update' function.
//                set_student_input_form_values(
//                    div.id, data_object[ind].firstname,
//                    data_object[ind].lastname,
//                    data_object[ind].stats.behavior,
//                    data_object[ind].stats.math,
//                    data_object[ind].stats.english,
//                    data_object[ind].stats.science
//                );

            console.log(data_object[ind].stats.behavior);

            // catch the zeros
            if(data_object[ind].stats.behavior == 0) {data_object[ind].stats.behavior = 1;}
            if(data_object[ind].stats.math == 0) {data_object[ind].stats.math = 1;}
            if(data_object[ind].stats.english == 0) {data_object[ind].stats.english = 1;}
            if(data_object[ind].stats.science == 0) {data_object[ind].stats.science = 1;}



            set_student_input_form_values(div.id, data_object[ind].firstname,
                data_object[ind].lastname,
                data_object[ind].stats.behavior,
                data_object[ind].stats.math,
                data_object[ind].stats.english,
                elem.stats.science);

            toggle_student_input_modal();
        };

        close_button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            remove_student(elem.student_id, elem.firstname, elem.lastname);
            console.log( elem.student_id + ' delete button clicked. ');
        };

        // APPENDS -------
        div.appendChild(img);
        div.appendChild(score_div);
        div.appendChild(name_div);
        div.appendChild(close_button);

        target_div.appendChild(div);
    });
}

function refresh_view() {
    // clear
    document.getElementById('students_view').innerHTML = '';

    $.ajax({
        method: 'GET',
        url: '/api/student',
        success: function(data, status, jqxhr) {
            console.log(data.payload);
            update_view(data.payload.students, document.getElementById('students_view'));
        },
        error: function(jqxhr, status, err) {
            console.log(err);
        }
    });
}

function get_average_score(data_object) {
    return ((data_object.stats.behavior + data_object.stats.math + data_object.stats.english + data_object.stats.science) / 4).toFixed(1);
}

function toggle_student_input_modal() {

    if(student_form_container.classList.contains('hide')) {
        student_form_container.classList.remove('hide');
        student_form_veil.classList.remove('hide');
    } else {
        student_form_container.classList.add('hide');
        student_form_veil.classList.add('hide');
    }
}

function clear_student_input_form_values() {
    document.getElementById('student_id_input').value = '';
    document.getElementById('student_firstname_input').value = '';
    document.getElementById('student_lastname_input').value = '';

    $('input[name=behavior]:checked').prop('checked', false);
    $('input[name=math]:checked').prop('checked', false);
    $('input[name=english]:checked').prop('checked', false);
    $('input[name=science]:checked').prop('checked', false);
}

function set_student_input_form_values(student_id, firstname, lastname, behavior, math, english, science) {
    document.getElementById('student_id_input').value = student_id;
    document.getElementById('student_firstname_input').value = firstname;
    document.getElementById('student_lastname_input').value = lastname;

//        $('input[name=behavior]')[parseInt(behavior)-1].checked = true;
//        $('input[name=math]:checked')[parseInt(math)-1].checked = true;
//        $('input[name=english]:checked')[parseInt(english)-1].checked = true;
//        $('input[name=science]:checked')[parseInt(science)-1].checked = true;

    $('input[name=behavior]')[behavior-1].checked = true;
    $('input[name=math]')[math-1].checked = true;
    $('input[name=english]')[english-1].checked = true;
    $('input[name=science]')[science-1].checked = true;

    // TODO: must override 'save' button to launch an 'update' function.
    student_form_save_button.innerHTML = 'update';
    student_form_save_button.onclick = function(e) {
        e.preventDefault();
        update_student();
    };
}

function add_new_student() {
    var student_id = document.getElementById('student_id_input').value;
    var student_firstname = document.getElementById('student_firstname_input').value;
    var student_lastname = document.getElementById('student_lastname_input').value;

    var student_behavior = $('input[name=behavior]:checked').val();
    var student_math = $('input[name=math]:checked').val();
    var student_english = $('input[name=english]:checked').val();
    var student_science = $('input[name=science]:checked').val();

    //DEBUG

    send_object = {
        user: user_data_object.user,
        student_id: parseInt(student_id),
        student_firstname: student_firstname,
        student_lastname: student_lastname,
        student_behavior: parseInt(student_behavior) || 1,
        student_math: parseInt(student_math) || 1,
        student_english: parseInt(student_english) || 1,
        student_science: parseInt(student_science) || 1
    };

    console.log(send_object);

    $.ajax({
        method: 'POST',
        url: '/api/student',
        data: send_object,
        success: function(data, status, jqxhr) {
            console.log('successfully added student, refreshing page.');

            // TODO:
            refresh_view();
        },
        error: function(jqxhr, status, err) {
            console.log('error saving student.' + err);
        }

    });
}

// user, student_id, firstname, lastname (all these to identify student)
function update_student() {

    //TODO: STORE CURRENT DATA FOR SEARCH.
    //TODO: STORE NEW DATA FOR UPDATE.

    console.log('TODO: update student with PUT. ');

    var student_id = document.getElementById('student_id_input').value;
    var student_firstname = document.getElementById('student_firstname_input').value;
    var student_lastname = document.getElementById('student_lastname_input').value;

    var student_behavior = $('input[name=behavior]:checked').val();
    var student_math = $('input[name=math]:checked').val();
    var student_english = $('input[name=english]:checked').val();
    var student_science = $('input[name=science]:checked').val();

    //DEBUG

    send_object = {
        user: user_data_object.user,
        student_id: parseInt(student_id),
        student_firstname: student_firstname,
        student_lastname: student_lastname,
        student_behavior: parseInt(student_behavior) || 1,
        student_math: parseInt(student_math) || 1,
        student_english: parseInt(student_english) || 1,
        student_science: parseInt(student_science) || 1
    };

    console.log(send_object);

    $.ajax({
        method: 'PUT',
        url: '/api/student',
        data: send_object,
        success: function(data, status, jqxhr) {
            console.log('successfully updated student, refreshing page.');

            // TODO:
            refresh_view();
            toggle_student_input_modal();
        },
        error: function(jqxhr, status, err) {
            console.log('error saving student.' + err);
        }

    });
}

function remove_student(student_id, student_firstname, student_lastname) {


    console.log('TODO: delete student with PUT. ');


    //DEBUG

    send_object = {
        user: user_data_object.user,
        student_id: parseInt(student_id),
        student_firstname: student_firstname,
        student_lastname: student_lastname

    };

    console.log(send_object);

    $.ajax({
        method: 'DELETE',
        url: '/api/student',
        data: send_object,
        success: function(data, status, jqxhr) {
            console.log('successfully deleted student, refreshing page.');
            refresh_view();
        },
        error: function(jqxhr, status, err) {
            console.log('error deleting student.' + err);
        }

    });
}


// EVENTS --------------------
window.addEventListener('DOMContentLoaded', function(e){

    toggle_student_input_modal();

    $.ajax({
        method: 'GET',
        url: '/api/student',
        success: function(data, status, jqxhr) {
            console.log(data.payload);
            update_view(data.payload.students, document.getElementById('students_view'));
        },
        error: function(jqxhr, status, err) {
            console.log(err);
        }
    });
});

student_form_cancel_button.onclick = function(e){
    e.preventDefault();
    console.log('cancelled student view');
    toggle_student_input_modal();
};

student_form_save_button.onclick = function(e){
    e.preventDefault();
    console.log('student item saved. ');
    toggle_student_input_modal();
    add_new_student();
};

add_student_button.onclick = function(e) {
    clear_student_input_form_values();
    toggle_student_input_modal();

    // redefine button to save again.
    student_form_save_button.innerHTML = 'save';
    student_form_save_button.onclick = function(e){
        e.preventDefault();
        console.log('student item saved. ');
        toggle_student_input_modal();
        add_new_student();
    };
};


// helper functions ---------
function capitalize(input) {
    return input[0].toUpperCase() + input.slice(1, input.length);
}

// EDIT MODAL FUNCTIONS ---------------
