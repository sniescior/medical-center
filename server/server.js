const ip = require('ip');
const patientRouter = require('./routes/patientRouter');
const projectRouter = require('./routes/projectRouter');
const summaryRouter = require('./routes/summaryRouter');
const examinationRouter = require('./routes/examinationsRouter');
const orderRouter = require('./routes/orderRouter');
const express = require('express');
const HttpStatus = require('./controller/httpStatus');
const app = express();
const Response = require('./domain/response');
const bodyParser = require('body-parser');
const axios = require('axios');

const database = require('./config/mysqlConfig');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use('/api/examinations', examinationRouter);
app.use('/api/orders', orderRouter);
app.use('/api/summary', summaryRouter);

app.get('/api/random', async (req, res) => {
    for(let i = 0; i < 15; i++) {
        const randomPatient = {
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            city: '',
            country: '',
            date_of_birth: '',
            join_date: '',
        }
        
        await axios.get('https://random-data-api.com/api/v2/users').then((response) => {
            randomPatient.first_name = response.data.first_name
            randomPatient.last_name = response.data.last_name
            randomPatient.email = response.data.email,
            randomPatient.date_of_birth = response.data.date_of_birth
        });
        
        await axios.get('https://random-data-api.com/api/v2/addresses').then((response) => {
            randomPatient.address = response.data.street_address,
            randomPatient.city = response.data.city,
            randomPatient.country = response.data.country
        });
        
        const getDay = () => Math.ceil(Math.random() * (28 - 1) + 1);
        const getMonth = () => Math.ceil(Math.random() * (12 - 1) + 1);
        const getYear = () => Math.ceil(Math.random() * (2022 - 2017) + 2017);
        
        randomJoinDate = `${getYear()}-${getMonth()}-${getDay()}`;

        randomPatient.join_date = randomJoinDate;

        let query = `
        INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth, join_date)
        VALUES ('${randomPatient.first_name}', '${randomPatient.last_name}', '${randomPatient.email}', '${randomPatient.address}', '${randomPatient.city}', '${randomPatient.country}', STR_TO_DATE('${randomPatient.date_of_birth}', '%Y-%m-%d'), STR_TO_DATE('${randomPatient.join_date}', '%Y-%m-%d'));
        `

        database.query(query, (err, result) => {
            try {
                if(err) { throw new Error(`Error running query:\n ${err}`); }
            } catch(err) {
                console.log(err);
            }
        });
    }
    res.send({ 'ack': 'ack' });
});

app.get('*', (req, res) => {
    res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Route does not exist'));
});

/**
 * ------------- SERVER -------------
 */
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on: http://${ip.address()}:${port}`);
});
