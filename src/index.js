import http from "http";
import connectDb from "./db/index.js";
import { config } from "dotenv";
import { createTodo } from "./controllers/todos.js";

config();
// controller
const controller = async (req, res) => {
  try {
    const method = req.method;
    const path = req.url;

    switch (path) {
      case "/": {
        if (method === "GET") {
          res.write("boobalan");
          return res.end();
        } else if (method === "POST") {
          res.write("post request");
          return res.end();
        }
      }

      case "/todos": {
        if (method === "GET") {
          const response = [
            {
              id: 1,
              title: "go to restroom",
              done: true,
            },
          ];
          res.write(response);
          return res.end();
        } else if (method === "POST") {
          const body = req.body;
          console.log({ body });
          const response = await createTodo();
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
