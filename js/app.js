//select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const ENTER_KEYCODE = 13

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//create todolist
let LIST = [];
let id = 0;


//addToDo function
function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add a item to the list if user presses the enter key
document.addEventListener("keyup", function(event){
  if (event.keyCode == ENTER_KEYCODE){
    const toDo = input.value;

    //if input isn't empty
    if (toDo){
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
    }
    input.value = "";
    id++;
  }
});

function completeToDo(element) { //if CLASS exists, remove else if class does not exist, add class
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode)

  LIST[element.id].trash = true;
}

//add event listeners to wait for clicks/keypress
list.addEventListener("click", function(event) {
  let element = event.target;
  const elementJOB = event.target.attributes.job.value;
  if (elementJOB == "complete") {
    completeToDo(element);
  } else if (elementJOB == "delete") {
    removeToDo(element);
  }
});


clear.addEventListener('click', function() {
  localStorage.clear();
})
