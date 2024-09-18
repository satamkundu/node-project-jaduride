const express = require('express');
const error = require('../middleware/error');
const generateToken = require('../routes/auth')

module.exports = function (app) {
    app.use(express.json());
    
    app.get('/', (req, res) => {
        res.send('Server is running...')
    })

    app.use('/api/generateToken', generateToken);

    app.use((req, res, next) => {
        res.status(404).send('404 Not Found');
    });

    app.use(error);
}