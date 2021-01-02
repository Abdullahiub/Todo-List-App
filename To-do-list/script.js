//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0){ //if user values aren't only spaces
        addBtn.classList.add("active"); //activate the add button
    }else{
        addBtn.classList.remove("active"); //deactivate the add button
    }
}

showTasks(); //calling showTasks function



//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null){ //if localStorage is null
            listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active"); //deactivate the add button if task empty
}
//Adding a task
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json into js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //length value in pendingNumb
    if(listArr.length > 0){ //check if task is empty
        deleteAllBtn.classList.add("active"); //Activate the clear all button
    }else{
        deleteAllBtn.classList.remove("active"); //deactivate the clear all button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new list
    inputBox.value = ""; //make input field blank after insertion
}

//delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete a task
    //Update taskbars and create new task
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//Clear all tasks
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty an array
    //after clearing all tasks, update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}

