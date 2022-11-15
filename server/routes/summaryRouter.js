const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

router.get('/patients', async (req, res) => {
    var query = ``;

    if(parseInt(req.query.byYear) === 1) {
        query = 
        `SELECT YEAR(join_date) as label, COUNT(id) as value FROM patients
         GROUP BY YEAR(join_date)`
    } else {
        query = 
        `SELECT MONTH(join_date) as label, COUNT(id) value FROM patients
         GROUP BY MONTH(join_date)`
    }
    
    database.query(query, (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No data found'));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Data retrieved', { items: result }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/participants', async (req, res) => {
    var query = ``;

    if(parseInt(req.query.byYear) === 1) {
        query = 
        `SELECT YEAR(pat.join_date) as label, COUNT(pat.id) as value FROM patients pat
        GROUP BY YEAR(pat.join_date), pat.id
        HAVING pat.id IN (SELECT part.patient_id FROM participants part)`
    } else {
        query = 
        `SELECT MONTH(pat.join_date) as label, COUNT(pat.id) as value FROM patients pat
        GROUP BY MONTH(pat.join_date), pat.id
        HAVING pat.id IN (SELECT part.patient_id FROM participants part)`
    }
    
    database.query(query, (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No data found'));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Data retrieved', { items: result }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

module.exports = router