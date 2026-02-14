const fs = require('node:fs');
const path = require("path");

const tasksfilepath  = path.join(__dirname, "data.json");

// function to read the tasks
function readTasks(){
    const data = fs.readFileSync(tasksfilepath, "utf8");
    return JSON.parse(data);
}


//function to write the tasks to the JSON file
function writeTasks(task){
    fs.writeFileSync(tasksfilepath , JSON.stringify(task, null, 2), "utf8")
}

//Generating Unique ID's for Each New Task 
const getNextId = (tasks) => {
    if (tasks.length === 0) return 1;
  
    return Math.max(...tasks.map(task => task.id)) + 1;
  };
  


// function to list all the task by their status
function listTasks(status){
    const tasks = readTasks();
    if(status == "todo"){
        const todotask = tasks.filter((task) => task.status === "todo");
        if (todotask.length === 0) {
            console.log("No tasks");
        }

        todotask.forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });

    }else if(status == "in-progress"){
        const taskInProgress = tasks.filter((task) => task.status == "in-progress");

        if(taskInProgress.length == 0){
            console.log("No tasks");
        }

        taskInProgress.forEach(task =>{
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });

    }else if (status == "done"){
        const taskDone = tasks.filter((task) => task.status == "done");

        if(taskDone.length == 0 ){
            console.log("No tasks");
        }

        taskDone.forEach(task =>{
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });
    }else{
        console.log(`Task with status [${status}] not found.`);
    }

}


// function to list all tasks
function listtasks(){
    const tasks = readTasks();
    if(tasks.length == 0){
        console.log("No Tasks Available")
    }
    tasks.forEach((task) =>{
        console.log(`${task.id}. ${task.description} [${task.status}]`)

    });

}

// Function to mark a task as in-progress
function markInProgress(id){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id == id);
    if(task){
        task.status = "in-progress";
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task marked as in-progress successfully with ID [${task.id}]`)
    }else{
        console.log(`Task with ID ${id} not found.`)

    }
   
}


// Function to mark a task as done
function markDone(id){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id == id);

    if(task){
        task.status = "done"
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log( `Task done Successfully [${task.id}]`);
    }else{
        console.log(`Task with ID ${id} not found`)
    }
}




//function to Add a New Task 
function addTask(description){
    const desc = description;
    const tasks = readTasks();

    new_task = {
        id : getNextId(tasks),
        description : desc,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    tasks.push(new_task);
    writeTasks(tasks);
    console.log( `Task Added Successfully [${new_task.id}]`);
};



//function to Update the existing Task 
function updateTask(id, newDescription){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id === id);

    if(task){
        task.description = newDescription;
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log( "Task Updated Successfully ")
    }else{
        console.log(`Task with ID ${id} not found.`)
    }
    
};


// function to delete the task 
function deleteTask(id){
    const tasks = readTasks();
    const updatetasks = tasks.filter((task) => task.id !== id);
    writeTasks(updatetasks);
    console.log( "Task Deleted Successfully ");


};


// Command-line interface logic
const args = process.argv.slice(2);
const op = args[0];
if(op == "add"){
    const description = args[1];
    if(!description){
        console.log("Please provide a task description.")
    }else{
        addTask(description);
    }
}else if(op == "update"){
    const id = Number(args[1]);
    const newDescription = args[2];
    if(!newDescription){
        console.log("Please providena a task ID and new description")
    }else{
        updateTask(id, newDescription);
    }

}else if(op == "mark-in-progress"){
    const id = args[1];
    if(id){
        markInProgress(id);
    }else{
        console.log("Please provide task id.")
    }
    
}else if(op == "mark-done"){
    const id = args[1];

    if(id){
        markDone(id);
    }else{
        console.log("Please provide task id.")
    }
    
}else if(op == "list"){
    const status = args[1];
    listTasks(status);
    
}else if(op == "delete"){
    const id = Number(args[1]);
    if(id){
        deleteTask(id);
    }else{
        console.log("Please provide task id.")
    }
    
}else if(op == "list"){
    listtasks();
}else{
console.log(
    `Usage: node index.js <command> [arguments]`
  );
  console.log(`Commands:`);
  console.log(
    `add <task description>            - Add a new task`
  );
  console.log(
    `list [status]                     - List tasks (status: done, to-do, in-progress)`
  );
  console.log(
    `update <id> <new description>     - Update a task by ID`
  );
  console.log(
    `delete <id>                       - Delete a task by ID`
  );
  console.log(
    `mark-in-progress <id>             - Mark a task as in-progress by ID`
  );
  console.log(
    `mark-done <id>                    - Mark a task as done by ID`
  );

}
