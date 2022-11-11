const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const mysql = require('mysql');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

const queries = {
    GET_ORDERS_COUNT: 'SELECT COUNT(*) as orders_count FROM participants part, orders ord WHERE part.patient_id = ? AND part.participant_id = ord.participant_id AND part.project_id = ?',
    GET_ORDERS: 'SELECT * FROM participants part, orders ord WHERE part.patient_id = ? AND part.participant_id = ord.participant_id AND part.project_id = ? ORDER BY ? ?'
}

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

router.get('/count/:projectID/:patientID', async (req, res) => {
    database.query(queries.GET_ORDERS_COUNT, [req.params.patientID, req.params.projectID], (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retrieved', { count: result.length }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/:projectID/:patientID', async (req, res) => {
    const query = `SELECT * FROM participants part, orders ord WHERE part.patient_id = ${req.params.patientID} AND part.participant_id = ord.participant_id AND part.project_id = ${req.params.projectID} AND ord.order_id LIKE '${req.query.idQuery}%' AND ord.title LIKE '%${req.query.titleQuery}%' ORDER BY ${req.query.orderByColumn} ${req.query.order}`;

    database.query(query, (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retrieved', { items: result }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

/**
 * 
 * -------------------------------- DELETE METHODS --------------------------------
 * 
 */

router.delete('/:orderID', async (req, res) => {
    const query = `DELETE FROM orders WHERE order_id = ${req.params.orderID}`;

    database.query(query, (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Zlecenie zostało usunięte'));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

module.exports = router;