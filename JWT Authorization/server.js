// const express = require('express')
// const app = express()
// const { ROLE, users } = require('./data')
// const { authUser, authRole } = require('./basicAuth')
// const projectRouter = require('./routes/projectsroute')
import express from "express";
import data from "./data.js";
import authentication from "./basicAuth.js";
import router from "./routes/projectsroute.js";

const { authUser, authRole } = authentication;
const { ROLE, users } = data;

const app = express();

app.use(express.json());
app.use(setUser);
app.use('/projects', router);

app.get('/', (req, res) => {
    res.send('Home Page');
})

app.post('/login', authUser, (req, res) => {
    const userId = req.body.userId;
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(`Welcome ${user.name}`);
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page');
});

function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = users.find(user => user.id === userId); 
    }
    next();
}

app.listen(3000);
