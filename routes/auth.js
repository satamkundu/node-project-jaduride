const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../service/auth');

router.get('/', (req, res) => {
    const user = {
        uuid : uuidv4()
    }
    const token = generateToken(user)
    res.send(token)
})

module.exports = router