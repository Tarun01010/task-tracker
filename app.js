const fs = require('node:fs');

const args = process.argv.slice(2);
const op = args[0];
const desc = args[1];

const tasks = JSON.parse(fs.readFileSync('data.json', "utf-8"));

const Add_task =  () => {
    new_task = {
        id : Date.now(),
        description : desc,
        status: "to-do",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    tasks.push(new_task);
    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
    console.log("Task Added Successfully");
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
    default:
        console.log("No file Existed");  
}




const Update_task = () => {};
const Delete_task = () =>{};