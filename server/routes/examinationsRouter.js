const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const mysql = require('mysql');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

router.get('/count-examinations', async (req, res) => {
    const idQuery = req.query.idQuery || '';
    const titleQuery = req.query.titleQuery || '';

    const query = 
        `SELECT COUNT(*) AS examinations_count FROM examinations 
         WHERE examination_id LIKE '%${idQuery}%' AND title LIKE '%${titleQuery}%'`;

    database.query(query, [idQuery, titleQuery], (err, result) => {
        try {
            if(err) { throw new Error("Error running query"); }
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                const normalResult = normalizeResult(result);
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, '', { examinationsCount: normalResult.examinations_count }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/get-examinations', async (req, res) => {
    const count = parseInt(req.query.count) || '';
    const page = parseInt(req.query.page) || '';
    const orderByColumn = req.query.orderByColumn || '';
    const order = req.query.order || '';

    const idQuery = req.query.idQuery || '';
    const titleQuery = req.query.titleQuery || '';

    var query = 
        `SELECT * FROM examinations
         WHERE examination_id LIKE '%${idQuery}%'
         AND title LIKE '%${titleQuery}%'
         ORDER BY ${orderByColumn} ${order} LIMIT ${count*page}, ${count}`;

    if(count && page && orderByColumn && order) {
        query = 
        `SELECT * FROM examinations
         WHERE examination_id LIKE '%${idQuery}%'
         AND title LIKE '%${titleQuery}%'
         ORDER BY ${orderByColumn} ${order} LIMIT ${count*page}, ${count}`;
    } else {
        query = 
        `SELECT * FROM examinations
         WHERE examination_id LIKE '%${idQuery}%'
         AND title LIKE '%${titleQuery}%'`;
    }

    database.query(query, (err, result) => {
        try {
            if(err) { throw new Error("Error running query"); }
            var resultArray = [];
            try {
                result.forEach(element => {
                    resultArray.push(Object.assign({}, element));
                });
            } catch(err) {}
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { items: resultArray }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

/**
 * 
 * -------------------------------- POST METHODS --------------------------------
 * 
 */

router.post('/add-examination', async (req, res) => {
    const examinationTitle = req.body.examinationTitle;
    const examinationDescription = req.body.examinationDescription;

    console.log('Request', req.body);
    
    const query = 'INSERT INTO examinations (title, description) VALUES (?, ?)';

    database.query(query, [examinationTitle, examinationDescription], (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { examination: { title: examinationTitle, description: examinationDescription } }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

/**
 * 
 * -------------------------------- PUT METHODS --------------------------------
 * 
 */

router.put('/edit-examination', async (req, res) => {
    const examinationID = req.body.examinationID;
    const examinationTitle = req.body.examinationTitle;
    const examinationDescription = req.body.examinationDescription;
    
    const query = 'UPDATE examinations SET title = ?, description = ? WHERE examination_id = ?';

    database.query(query, [examinationTitle, examinationDescription, examinationID], (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', 'Dane badania zostały zaktualizowane'));
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

router.delete('/delete-examination', async (req, res) => {
    const examinationID = req.body.examinationID;
    
    const query = 'DELETE FROM examinations WHERE examination_id = ?';

    database.query(query, [examinationID], (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', 'Badanie zostało usunięte'));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

module.exports = router;