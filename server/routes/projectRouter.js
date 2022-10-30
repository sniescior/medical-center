const express = require('express');
const router = express.Router();

router.get('/page/:pageNumber', (req, res) => {
    res.send('Return projects');
});

module.exports = router;
