const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const application = express();
const Todo = require('./models/Todo');
mongoose.connect('mongodb://localhost:27017/TodosApp');
application.use('/static', express.static('static'));
application.use(bodyParser.json());
application.get('/', function (request, response) {
    response.sendFile(__dirname + "/static/index.html");
})
// put routes here
application.get('/api/todos', async (request, response) => {
    var todos = await Todo.find();
    return response.json(todos);
});

application.post('/api/todos', async (request, response) => {
    var todo = await Todo.create({ title: request.body.title, order: request.body.order });
    todo.save();
    return response.json(todo);
});

application.get('/api/todos/:id', (request, response) => {
    let id = request.params.id;
    let todo = todos.find(todo => todo.id === id);
    if (!todo) {
        response.status(404);
        return response.end();
    }
    return response.json(todo);
});

application.put('/api/todos/:id', (request, response) => {
    var id = parseInt(request.params.id);
    let todos = request.body;
    let existing = todos.find(q => q.id === id);
    existing.name = todo.name;
    return response.json(existing);
});

application.patch('/api/todos/:id', (request, response) => {
    
});

application.delete('/api/todos/:id', (request, response) => {
    let id = parseInt(request.params.id);
    let todo = todos.find(q => q.id === id);
    let index = todos.findIndex(q => q.id === id);
    if (index === -1) {
        response.status(404);
        return response.end();
    }
    todos.splice(index, 1);
});

application.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
