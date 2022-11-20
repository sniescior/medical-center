const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

router.get('/participants', async (req, res) => {
    var query = ``;

    if(parseInt(req.query.byYear) === 1) {
        query = 
        `SELECT COUNT(part.patient_id) as value, YEAR(pat.join_date) as label FROM patients pat, participants part 
         WHERE pat.id IN (SELECT patient_id FROM participants)
         AND pat.id = part.patient_id
         GROUP BY YEAR(pat.join_date)`
    } else {
        query = 
        `SELECT COUNT(part.patient_id) as value, MONTH(pat.join_date) as label FROM patients pat, participants part 
         WHERE pat.id IN (SELECT patient_id FROM participants)
         AND pat.id = part.patient_id
         GROUP BY MONTH(pat.join_date)`
    }
    
    database.query(query, (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Data retrieved', { items: result }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/patients', async (req, res) => {
    var query = ``;

    if(parseInt(req.query.byYear) === 1) {
        query = 
        `SELECT YEAR(pat.join_date) as label, COUNT(pat.id) as value FROM patients pat
        GROUP BY YEAR(pat.join_date)`
    } else {
        query = 
        `SELECT MONTH(pat.join_date) as label, COUNT(pat.id) as value FROM patients pat
        GROUP BY MONTH(pat.join_date)`
    }
    
    database.query(query, (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
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