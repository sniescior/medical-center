const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

const queries = {
    GET_ORDERS_COUNT: 'SELECT COUNT(*) as orders_count FROM participants part, orders ord WHERE part.patient_id = ? AND part.participant_id = ord.participant_id AND part.project_id = ?',
    GET_ORDERS: 'SELECT * FROM participants part, orders ord WHERE part.patient_id = ? AND part.participant_id = ord.participant_id AND part.project_id = ? ORDER BY ? ?'
};

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
};

/**
 * 
 * -------------------------------- POST METHODS --------------------------------
 * 
 */

const addExaminationsToOrder = (res, orderID, examinations) => {
    if(examinations.length > 0) {
        examinations.forEach(examination => {
            const query = `INSERT INTO examinations_order (examination_id, order_id) VALUES (${examination}, ${orderID})`;
            database.query(query, (err, result) => {
                try {
                    if(err) { throw new Error(`Error running query:\n ${err}`); }
                } catch(err) {
                    console.log(err);
                    res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
                }
            });
        });
    }
    res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Dodano zlecenie'));
}

router.post('/add', async (req, res) => {

    var addOrderQuery = ``;

    if(req.body.completionDate) {
        addOrderQuery = `INSERT INTO orders (participant_id, title, completion_date) VALUES (${req.body.participantID}, '${req.body.title}', STR_TO_DATE('${req.body.completionDate}', '%Y-%m-%d'))`;
    } else {
        addOrderQuery = `INSERT INTO orders (participant_id, title) VALUES (${req.body.participantID}, '${req.body.title}')`;
    }

    database.query(addOrderQuery, (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            addExaminationsToOrder(res, result.insertId, req.body.examinations);
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

router.get('/examinations/:orderID', async (req, res) => {
    var query = ``;
    
    if(parseInt(req.query.assigned)) {
        console.log('Return only assigned exminations');
        query = 
        `SELECT ord.title, exam_ord.order_id, exam_ord.examination_id, exam.title, exam.description, exam_ord.result FROM orders ord, examinations exam, examinations_order exam_ord
        WHERE exam_ord.order_id = ${parseInt(req.params.orderID)} AND ord.order_id = exam_ord.order_id AND exam_ord.examination_id = exam.examination_id
        ORDER BY ord.title`;
    } else {
        console.log('Return all assigned exminations');
        query = 
        `SELECT * FROM examinations WHERE examination_id NOT IN ( SELECT exam_ord.examination_id FROM orders ord, examinations exam, examinations_order exam_ord
         WHERE exam_ord.order_id = ${parseInt(req.params.orderID)} AND ord.order_id = exam_ord.order_id AND exam_ord.examination_id = exam.examination_id
         ORDER BY ord.title )`;
    }

    database.query(query, (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Orders retrieved', { items: result }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/count/:projectID/:patientID', async (req, res) => {

    const query = 
        `SELECT * FROM participants part, orders ord 
         WHERE part.patient_id = ${req.params.patientID} 
         AND part.participant_id = ord.participant_id 
         AND part.project_id = ${req.params.projectID} 
         AND ord.order_id LIKE '${req.query.idQuery}%' 
         AND ord.title LIKE '%${req.query.titleQuery}%' 
         ORDER BY ${req.query.orderByColumn} ${req.query.order}`;

    database.query(query, (err, result) => {
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
    const query = 
        `SELECT * FROM participants part, orders ord 
         WHERE part.patient_id = ${req.params.patientID} 
         AND part.participant_id = ord.participant_id 
         AND part.project_id = ${req.params.projectID} 
         AND ord.order_id LIKE '${req.query.idQuery}%' 
         AND ord.title LIKE '%${req.query.titleQuery}%' 
         ORDER BY ${req.query.orderByColumn} ${req.query.order}
         LIMIT ${req.query.page*req.query.count}, ${req.query.count}`;

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