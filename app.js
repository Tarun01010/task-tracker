const fs = require('node:fs');

const args = process.argv.slice(2);
const op = args[0];


const tasks = JSON.parse(fs.readFileSync('data.json', "utf-8"));



// OPERATIONS
const Add_task =  () => {
    const desc = args[1];

    new_task = {
        id : Date.now(),
        description : desc,
        status: "to-do",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    tasks.push(new_task);
    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
    console.log( `Task Added Successfully (${new_task.id})`);
};


const Update_task = () => {
    const id = Number(args[1]);
    const desc = args[2];

    const task = tasks.find(t => t.id === id);

    task.description = desc;
    task.updatedAt = new Date().toISOString();

    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
    console.log( "Task Updated Successfully ");

};



const Delete_task = () =>{
    const id = args[1];

};


const list=()=> {
    
};

switch(op){
    case "add":
        Add_task();
        break;
    case "Update":
        Update_task();
        break;
    case "Delete":
        Delete_task();
        break;
    case "list":
        list();
        break;
    default:
        console.log("Invalid Operation");  
}



