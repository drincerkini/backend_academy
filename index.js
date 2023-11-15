import fs from "fs/promises";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const getTodos = async () => {
  try {
    const data = await fetch(`${API_URL}`);
    const dataJson = await data.json();
    const dataToString = JSON.stringify(dataJson);

    await fs.writeFile("todosList.txt", dataToString);
    console.log("File Written successfuly");
  } catch (error) {
    console.log("error" + error);
  }
};

const getTodoById = async (id) => {
  if (!id) {
    console.log("id is wrong!");
    return;
  }

  try {
    const data = await fs.readFile("todosList.txt", "utf8");
    const todos = JSON.parse(data);
    const todo = todos.find((x) => x.id === id);

    return todo;
  } catch (err) {
    console.log("error: " + err);
  }
};

await getTodos();
const todo = await getTodoById(1);
console.log(todo);
