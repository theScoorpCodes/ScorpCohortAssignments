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

app.put("/", (req, res)=>{
    
})

app.post("/", (req, res) => {
  const task = req.body;
  task.id = tasks.length + 1;
  tasks.push(task);
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
  res.json(task);
});

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((task) => {
      task.id != id;
  });
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));
  res.json(tasks)
});

app.listen(port);
