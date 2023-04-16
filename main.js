
let form = document.getElementById("form");
let textInput = document.getElementById("tasktitle");
let dateInput = document.getElementById("duedate");
let textarea = document.getElementById("description");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let submitData = document.getElementById("submitData");

form.addEventListener("submitData", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (tasktitle.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    tasktitle: tasktitle.value,
    duedate: duedate.value,
    description: description.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  tasktitle.value = selectedTask.children[0].innerHTML;
  duedate.value = selectedTask.children[1].innerHTML;
  description.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  tasktitle.value = "";
  duedate.value = "";
  description.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();
