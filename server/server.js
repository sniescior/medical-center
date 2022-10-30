const ip = require('ip');
const patientRouter = require('./routes/patientRouter');
const projectRouter = require('./routes/projectRouter');
const express = require('express');
const HttpStatus = require('./controller/httpStatus');
const app = express();
const Response = require('./domain/response');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ------------- ROUTES -------------
 */
app.get('/', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Medical Center API, v1.0.0'));
});

app.get('/api', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Medical Center API, v1.0.0'));
});

app.use('/api/patients', patientRouter);
app.use('/api/projects', projectRouter);

/**
 * ------------- SERVER -------------
 */
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on: http://${ip.address()}:${port}`);
});
