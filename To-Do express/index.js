const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(function (req, res, next) {
  tasks = JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json(tasks);
});

app.put("/:id", (req, res) => {
  const edittask = req.body.newTask;
  const id = req.params.id;
  tasks[id - 1].task = edittask;
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
  res.json(tasks);
});

app.post("/", (req, res) => {
  const newTask = {
    task: req.body.task,
    id: tasks.length + 1
  }
  tasks.push(newTask);
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
  res.json(tasks);
});

app.delete("/:id", (req, res) => {
  const reqId = req.params.id;
  tasks = tasks.filter((task) => task.id != reqId);
  for(let i = 0 ; i < tasks.length ; i++ ){
    tasks[i].id = i+1
  }
  console.log(tasks);
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
  res.json(tasks);
});

app.listen(port);
