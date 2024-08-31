let tasks = [
  {
    id: 1,
    task: "task - 1",
  },
  {
    id: 2,
    task: "task - 2",
  },
];

const reqId = 1;

newArr = tasks.filter((task) => (task.id != reqId));
console.log(newArr);
