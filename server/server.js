const { urlencoded } = require('express');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.send('Api works');
});

const port = 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
