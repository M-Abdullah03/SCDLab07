const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let users = [];

app.post('/register', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    users.push(user);
    res.status(201).send();
});

app.post('/login', (req, res) => {
    const user = users.find(user => user.username === req.body.username && user.password === req.body.password);
    if (user) {
        req.user = user;
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

//Task Creation
app.post('/tasks', (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category,
        status: 'incomplete',
        priority: req.body.priority,
        username: req.user.username
    };
    tasks.push(task);
    res.status(201).send(task);
});

//Task Status Updation
app.put('/tasks/:title', (req, res) => {
    const task = tasks.find(task => task.title === req.params.title && task.username === req.user.username);
    if (task) {
        task.status = req.body.status;
        res.send(task);
    } else {
        res.status(404).send();
    }
});

//Tasks
app.get('/tasks', (req, res) => {
    const userTasks = tasks.filter(task => task.username === req.user.username);
    res.send(userTasks);
});

app.listen(3000, () => console.log('Server started'));