import fs from 'fs/promises';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = async() => {
    try{
        const data = await fetch(`${API_URL}`);
        const dataJson = await data.json();
        const dataToString = JSON.stringify(dataJson);
        // console.log( dataToString);

        await fs.writeFile('todosList.txt', dataToString);
        console.log('File Written successfuly');
    }catch(error){
        console.log('error' + error);
    }
}

const getTodoById = async(id) =>{
    if(!id) {
        console.log('id is wrong!');
        return;
    }

    try{
        const data = await fs.readFile('todosList.txt', { encoding: 'utf8' });
        const todos = await JSON.parse(data);
        const todo = todos.find(x => x.id === id)
        console.log(todo);
    }catch(err){
        console.log('error' + err);

    }

}

// getTodos();
getTodoById(3);
// console.log(todoById)