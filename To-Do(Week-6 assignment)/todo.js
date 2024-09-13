async function signUp() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  await axios.post("http://localhost:3000/signup", {
    username: username,
    password: password,
  });
  alert("Successfully signed up");
}

async function signIn() {
  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;

  const response = await axios.post("http://localhost:3000/signin", {
    username: username,
    password: password,
  });

  localStorage.setItem("accessToken", response.data.accessToken);
  alert("Successfully signed in");
}

async function getTodos() {
  const ansEle = document.getElementById("answers");
  const response = await axios.get("http://localhost:3000/todos", {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const todos = response.data;

  if (todos) {
    todos.forEach((element) => {
      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("id", element.id);

      const taskSpan = document.createElement("span");
      newSpan.setAttribute("id", element.id);
      newSpan.innerHTML = element.task;

      const editButton = document.createElement("button");
      editButton.innerText = "edit";
      editButton.setAttribute("id", `${count}`);
      editButton.setAttribute("onclick", `editTask(${count})`);

      const delButton = document.createElement("button");
      delButton.innerText = "delete";
      delButton.setAttribute("onclick", `removeTask(${count})`);

      taskSpan.innerHTML = element.id + ". " + element.task;
      taskDiv.appendChild(deleteBtn);

      const mainDiv = document.getElementById("answers");
      mainDiv.appendChild(taskDiv);
    });
  }
}

function editTask(n) {
//   const divEle = document.getElementById(n);
//   const btn1 = divEle.childNodes[1];
//   const btn2 = divEle.childNodes[2];
    console.log(n)
}

function removeTask(n) {
  console.log(n);
}

function addTodo() {
  const content = document.getElementById("inpBox").value;
  const outputDiv = document.getElementById("answers");

  const taskDiv = document.createElement("div");
  const taskSpan = document.createElement("span");
  taskSpan.innerHTML = content;
  outputDiv.appendChild(taskDiv);
}
