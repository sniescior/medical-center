const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const mysql = require('mysql');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();
// STR_TO_DATE('11-11-1996', '%d-%m-%Y')
const queries = {
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(\'?-?-?\', \'%Y-%m-%d\'))',
    UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, address = ?, city = ?, country = ?, date_of_birth = STR_TO_DATE(\'?-?-?\', \'%Y-%m-%d\') WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?',
    DELETE_ALL_PATIENTS: 'DELETE * FROM patients'
};

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

router.get('/all', async (req, res) => {

    const query = `SELECT * FROM patients`;

    database.query(query, (err, result) => {
        try {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { patients: result }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    })
});

router.get('/count-patients', async (req, res) => {

    const idQuery = req.query.idQuery || '';
    const first_nameQuery = req.query.first_nameQuery || '';
    const last_nameQuery = req.query.last_nameQuery || '';
    const emailQuery = req.query.emailQuery || '';
    const addressQuery = req.query.addressQuery || '';
    const cityQuery = req.query.cityQuery || '';
    const countryQuery = req.query.countryQuery || '';
    const date_of_birthQuery = req.query.date_of_birthQuery || '';

    const query = `
        SELECT COUNT(*) AS patientsCount FROM patients 
        WHERE id LIKE '${idQuery}%' 
        AND first_name LIKE '${first_nameQuery}%'
        AND last_name LIKE '%${last_nameQuery}%'
        AND email LIKE '${emailQuery}%'
        AND address LIKE '${addressQuery}%'
        AND city LIKE '${cityQuery}%'
        AND country LIKE '${countryQuery}%'
        AND date_of_birth LIKE '${date_of_birthQuery}%'`;

    database.query(query, (err, result) => {
        try {
            const normalResult = normalizeResult(result);
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { patientsCount: normalResult.patientsCount }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    })
});

router.get('/:id', async (req, res) => {
    database.query(queries.SELECT_PATIENT, [req.params.id], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No patient with given id (${req.params.id}) was found`));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient retrieved', result[0] ));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.post('/', async (req, res) => {
    console.log('Creating patient');
    console.log(typeof(req.body.yearOfBirth));
    console.log(req.body.yearOfBirth);
    console.log(req.body.dateOfBirth);
    console.log(req.body.monthOfBirth);
    database.query(queries.CREATE_PATIENT, Object.values(req.body), (err, result) => {
        try {
            if(!result) {
                console.log(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                const date_of_birth = `${parseInt(req.body.yearOfBirth)}-${parseInt(req.body.monthOfBirth)}-${parseInt(req.body.dateOfBirth)}`;
                const patient = { id: result.insertedId, ...req.body, date_of_birth: new Date(date_of_birth) };
                res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Dodano pacjenta', { patient }));
            }
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.put('/:id', async (req, res) => {
    const patientID = req.params.id;
    database.query(queries.SELECT_PATIENT, [req.params.id], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleziono pacjęta (id: ${patientID})`));
            } else {
                database.query(queries.UPDATE_PATIENT, [req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.city, req.body.country, req.body.yearOfBirth, req.body.monthOfBirth, req.body.dateOfBirth, req.params.id], (err, result) => {
                    if(!err) {
                        res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Zaktualizowano dane pacjenta', { id: req.params.id, ...req.body } ));
                    } else {
                        console.log(err.message);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Internal Server Error`));
                    }
                });
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

// Delete patient by id
router.delete('/:id', async (req, res) => {
    database.query(queries.DELETE_PATIENT, [req.params.id], (err, result) => {
        try {
            if(result.affectedRows > 0) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Pacjent został usunięty'));
            } else {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No patient with given id (${req.params.id}) was found`));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

// Filtering query
router.get('/*', async (req, res) => {
    const count = parseInt(req.query.count);
    const page = parseInt(req.query.page);
    const orderByColumn = req.query.orderByColumn;
    const order = req.query.order;

    const idQuery = req.query.idQuery || '';
    const first_nameQuery = req.query.first_nameQuery || '';
    const last_nameQuery = req.query.last_nameQuery || '';
    const emailQuery = req.query.emailQuery || '';
    const addressQuery = req.query.addressQuery || '';
    const cityQuery = req.query.cityQuery || '';
    const countryQuery = req.query.countryQuery || '';
    const date_of_birthQuery = req.query.date_of_birthQuery || '';
    
    const query = `
        SELECT * FROM patients 
        WHERE id LIKE '%${idQuery}%' 
        AND first_name LIKE '%${first_nameQuery}%'
        AND last_name LIKE '%${last_nameQuery}%'
        AND email LIKE '%${emailQuery}%'
        AND address LIKE '%${addressQuery}%'
        AND city LIKE '%${cityQuery}%'
        AND country LIKE '%${countryQuery}%'
        AND date_of_birth LIKE '%${date_of_birthQuery}%'
        ORDER BY ${orderByColumn} ${order} LIMIT ${page*count}, ${count}`;

    database.query(query, (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No patients found', { patients: [], patientsCount: 0 }));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retrieved', { patients: result, patientsCount: result.length }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

module.exports = router;
