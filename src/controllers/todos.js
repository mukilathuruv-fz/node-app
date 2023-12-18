import Todo from "../models/todo.js";

export const createTodo = async () => {
  try {
    const createdTodo = new Todo({
      title: "go to temple",
    });
    await createdTodo.save();
    return createdTodo;
  } catch (err) {
    console.log(`while creating todo ${err.message}`);
    return err.message || "something went wrong";
  }
};
