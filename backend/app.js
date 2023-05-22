const express = require('express');
const mysql = require('mysql2');
const { sequelize } = require('./models/index.js');
const path = require('path');


const usersRoutes = require('./routes/users.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require('./routes/comments.js');


const app = express();


require('dotenv').config();
const helmet = require("helmet");
app.use(helmet());

const cors = require("cors");
app.use(cors());

try {
    sequelize.authenticate();
    console.log('Connection Sequelize to MySQL > successful');
} catch (error) {
    console.error('Unable to connect sequelize to the database:', error);
}

sequelize.sync ({ force:false});
sequelize.sync({ alter:true})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;