const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const mysql = require('mysql');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

router.get('/count-examinations', async (req, res) => {
    const idQuery = req.query.idQuery || '';
    const titleQuery = req.query.titleQuery || '';

    const query = 
        `SELECT COUNT(*) AS examinations_count FROM examinations 
         WHERE examination_id LIKE '%${idQuery}%' AND title LIKE '%${titleQuery}%'`;

    database.query(query, [idQuery, titleQuery], (err, result) => {
        if(err) {
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
            return;
        }
        try {
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
    const count = parseInt(req.query.count);
    const page = parseInt(req.query.page);
    const orderByColumn = req.query.orderByColumn;
    const order = req.query.order;

    const idQuery = req.query.idQuery || '';
    const titleQuery = req.query.titleQuery || '';

    const query = 
        `SELECT * FROM examinations
         WHERE examination_id LIKE '%${idQuery}%'
         AND title LIKE '%${titleQuery}%'
         ORDER BY ${orderByColumn} ${order} LIMIT ${count*page}, ${count}`;

    database.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
            return;
        }
        try {
            var resultArray = [];
            try {
                result.forEach(element => {
                    resultArray.push(Object.assign({}, element));
                });
            } catch(err) {}
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { examinations: resultArray }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});


module.exports = router;