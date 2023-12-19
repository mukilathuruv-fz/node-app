import Todo from "../models/todo.js";

export const createTodo = async body => {
  try {
    const createdTodo = new Todo({ ...body });
    await createdTodo.save();
    return createdTodo;
  } catch (err) {
    console.log(`while creating todo ${err.message}`);
    return err.message || "something went wrong";
  }
};
export const updateTodo = async (id, body) => {
  try {
    const udpatedTodo = await Todo.findByIdAndUpdate(id, { ...body });
    return udpatedTodo;
  } catch (err) {
    console.log(`while updating todo ${err.message}`);
    return err.message || "something went wrong";
  }
};

export const getTodos = async () => {
  try {
    const todos = await Todo.find();
    console.log({
      todos,
    });
    return todos;
  } catch (err) {
    console.log(`while getting all todo ${err.message}`);
    return err.message || "something went wrong";
  }
};
export const getTodo = async id => {
  try {
    const todo = await Todo.findById(id);
    console.log({
      todo,
    });
    return todo;
  } catch (err) {
    console.log(`while getting one todo ${err.message}`);
    return err.message || "something went wrong";
  }
};
export const deleteTodo = async id => {
  try {
    const todo = await Todo.findByIdAndDelete(id);
    console.log({
      todo,
    });
    return todo;
  } catch (err) {
    console.log(`while deleting todo ${err.message}`);
    return err.message || "something went wrong";
  }
};
