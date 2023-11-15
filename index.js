import fs from 'fs/promises';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = async() => {
    try{
        const data = await fetch(`${API_URL}`);
        const dataJson = await data.json();
        const dataToString = JSON.stringify(dataJson);
        // console.log( dataToString);

        await fs.writeFile('todosList.txt', dataToString);

    }catch(error){
        console.log('error' + error);
    }
}

const getTodoById = () =>{

}

getTodos();