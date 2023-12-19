import http from "http";
import connectDb from "./db/index.js";
import { config } from "dotenv";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "./controllers/todos.js";
import bodyParser from "body-parser";
config();
// controller
const parser = bodyParser.json();
const controller = async (req, res) => {
  try {
    const method = req.method;
    const path = req.url;

    switch (true) {
      case path.startsWith("/todos"): {
        const [host, baseUrl, id] = path.split("/");
        if (id) {
          if (method === "GET") {
            const response = await getTodo(id);
            res.write(JSON.stringify(response));
            return res.end();
          } else if (method === "DELETE") {
            const response = await deleteTodo(id);
            res.write(JSON.stringify(response));
            return res.end();
          } else if (method === "PUT") {
            parser(req, res, async () => {
              const response = await updateTodo(id, req.body);
              res.write(JSON.stringify(response));
              return res.end();
            });
          }

          break;
        }

        if (method === "GET") {
          const todos = await getTodos();
          res.write(JSON.stringify(todos));
          return res.end();
        } else if (method === "POST") {
          parser(req, res, async () => {
            const response = await createTodo(req.body);
            if (typeof response !== "string") {
              res.write(JSON.stringify({ response }));
              res.statusCode = 201;
              return res.end();
            }
            res.write(
              JSON.stringify({
                response,
              })
            );
            res.statusCode = 500;
            return res.end();
          });
        }
      }

      default: {
        res.write("invalid method");
        return res.end();
      }
    }
  } catch (err) {
    console.log(`while getting all todos ${err.message}`);
    res.write("something went wrong");
    return res.end();
  }
};
// console.log(http);
http.createServer(controller).listen(8080, () => {
  connectDb().then(() => {
    console.log("server listening on");
  });
});
