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




// function to list all the task by their status
function listTasks(status){
    const tasks = readTasks();
    if(status == "todo"){
        const todotask = tasks.filter((task) => task.status === "todo");
        if (todotask.length === 0) {
            console.log("No done tasks");
            return;
        }

        todotask.forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });

    }else if(status == "in-progress"){
        const task = tasks.filter((task) => task.status === "in-progress");
        const taskInProgress = task.filter((task) => task.status == "in-progress");

        taskInProgress.forEach(task =>{
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });

    }else{
        const task = tasks.filter((task) => task.status === "done");
        const taskDone = task.filter((task) => task.status == "done");

        taskDone.forEach(task =>{
            console.log(`${task.id}. ${task.description} [${task.status}]`);
        });
    }

}


// function to list all tasks
function listtasks(){
    const tasks = readTasks();
    tasks.forEach((task) =>{
        console.log(`${task.id}. ${task.description}`)

    });

}

// Function to mark a task as in-progress
function markInProgress(id){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id == id);
    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
}


// Function to mark a task as done
function markDone(id){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id == id);
    task.status = "done"
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
}




//function to Add a New Task 
function addTask(description){
    const desc = description;
    const tasks = readTasks();

    new_task = {
        id : Date.now(),
        description : desc,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    tasks.push(new_task);
    writeTasks(tasks);
    console.log( `Task Added Successfully (${new_task.id})`);
};



//function to Update the existing Task 
function updateTask(id, newDescription){
    const tasks = readTasks();
    const task = tasks.find((task) => task.id === id);
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log( "Task Updated Successfully ");
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
    addTask(description);
}else if(op == "update"){
    const id = Number(args[1]);
    const newDescription = args[2];
    updateTask(id, newDescription);

}else if(op == "mark-in-progress"){
    const id = args[1];
    markInProgress(id);

}else if(op == "mark-done"){
    const id = args[1];
    markDone(id);
}else if(op == "list"){
    const stat = args[1];
    listTasks(stat);
}else if(op == "delete"){
    const id = Number(args[1]);
    deleteTask(id);
    
}else{
    listtasks();
}



