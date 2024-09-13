const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const app = express();
const JWT_SECRET = "hello";
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const user = jwt.verify(authHeader, JWT_SECRET);
  if (user) {
    req.username = user.username;
    next();
  } else {
    res.send(403).JSON({ message: "Invalid token" });
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });

  let users = JSON.parse(data);

  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    res.send({ message: "User already exists" });
  } else {
    users.push({
      username: username,
      password: password,
      todos: [],
    });
    res.send({ message: "User created" });
  }

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });

  let users = JSON.parse(data);

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (foundUser) {
    const accessToken = jwt.sign({ username: foundUser.username }, JWT_SECRET);
    res.send({ accessToken: accessToken });
  } else {
    res.send({ message: "Username or password incorrect" });
  }
});

app.get("/todos", auth, (req, res) => {
  const username = req.username;
  const data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });
  let users = JSON.parse(data);
  const foundUser = users.find((user) => user.username === username);
  res.send(foundUser.todos);
});

app.post("/todos", auth, (req, res) => {
  const task = req.body.task;
  const username = req.username;
  const data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });
  let users = JSON.parse(data);

  const foundUser = users.find((user) => user.username === username);

  foundUser.todos.push({
    id: foundUser.todos.length + 1,
    task: task,
  });
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ message: "Task added" });
});

app.put("/todos", auth, (req, res) => {
  const task = req.body.task;
  const username = req.username;
  const id = req.body.id;
  const data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });
  let users = JSON.parse(data);
  const foundUser = users.find((user) => user.username === username);
  foundUser.todos[id - 1].task = task;

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ message: "Task updated" });
});

app.delete("/todos", auth, (req, res) => {
  const username = req.username;
  const id = req.body.id;

  const data = fs.readFileSync("users.json", {
    encoding: "utf-8",
  });
  let users = JSON.parse(data);
  const foundUser = users.find((user) => user.username === username);

  foundUser.todos.splice(id - 1, 1);

  for (let i = 0; i < foundUser.todos.length; i++) {
    foundUser.todos[i].id = i + 1;
  }

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ message: "Task removed" });
});

app.listen(3000);
