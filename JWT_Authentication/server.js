import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
const app = express();

dotenv.config();
app.use(express.json());

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Tim',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username == req.user.name));

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader; 
    try {
        if (token == null) return res.sendStatus(401);
        const decode =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decode;
        next();
    }
    catch (err) {
        return res.sendStatus(404);
    }
}

app.listen(3000);
