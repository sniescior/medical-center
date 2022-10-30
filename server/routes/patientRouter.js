const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/page/:pageNumber', async (req, res) => {
    res.send('Return patients ');
})

module.exports = router;
