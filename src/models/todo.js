import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    // title: String,
    title: {
      type: String,
      required: true,
      trim: true,
      set: value => {
        const val = value[0].toUpperCase() + value.slice(1);
        return val;
      },
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    overwriteModels: true,
  }
);

const Todo = model("Todo", todoSchema);

export default Todo;
