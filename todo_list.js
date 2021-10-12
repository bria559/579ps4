let add_btn = document.getElementById('add_task');
let description_text_element = document.getElementById('task_description_input');
let dateInputElement = document.getElementById('duedate_input');
let timeInputElement = document.getElementById('duetime_input');

function addTask(description, dueTime){
// PARAMETERS
// description- a string with a task description
// dueTime- a timestamp representing when that task is due (or false if there is no due time specified)
 
    //description_text.textContent() = description;

    let list_el = document.getElementById('task_list');
    var node = document.createElement('LI');
    var textnode = document.createTextNode(description);
    node.appendChild(textnode);
    list_el.appendChild(node);

    // return list_el;
    if (dueTime){
        let dueSpan = document.createElement('span');
        dueSpan.setAttribute('class', 'due');
        let human_date = new Date(dueTime);
        dueSpan.innerHTML = human_date.toLocaleString();
        node.appendChild(dueSpan);
    }

    let done_btn = document.createElement('button');
    done_btn.innerHTML = 'Done';
    done_btn.setAttribute('class', "btn btn-sm btn-outline-danger done");
    done_btn.setAttribute('type', 'button')
    node.appendChild(done_btn);
    done_btn.addEventListener('click', ()=>{
        node.remove();
    });
}

//addTask("Learn to wrap gifts", 1639944400000);

function addTaskandTime(){
    function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
        const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
        const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    
        if(dueDate && dueTime) { // The user specified both a due date & due time
            //Add the timezone offset to account for the fact that timestamps are specified by UTC
            const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
            return dueDate + dueTime + timezoneOffset;
        } else {
            // if the user did not specify both a due date and due time, return false
            return false;
        }
    }
    let converted_date = dateAndTimeToTimestamp(dateInputElement, timeInputElement);
    description_text = description_text_element.value;
    addTask(description_text, converted_date);
    description_text_element.value = "";
};

add_btn.addEventListener("click", addTaskandTime);

description_text_element.addEventListener('keydown', function(event){
    if (event.keyCode === 13){
        addTaskandTime();
    };
});



