const express = require('express');
const database = require('../config/mysqlConfig');
const Response = require('../domain/response');
const mysql = require('mysql');
const HttpStatus = require('../controller/httpStatus');
const router = express.Router();

const queries = {
    SELECT_PROJECTS: 'SELECT * FROM projects ORDER BY id LIMIT ?, ?',
    SELECT_PROJECT: 'SELECT * FROM projects WHERE id = ?',
    CREATE_PROJECT: 'INSERT INTO projects (name) VALUES (?)',
    UPDATE_PROJECT: 'UPDATE projects SET name = ? WHERE id = ?',
    DELETE_PROJECT: 'DELETE FROM projects WHERE id = ?'
};

router.get('/:id', async (req, res) => {
    console.log('Retrieving project');
    database.query(queries.SELECT_PROJECT, [req.params.id], (err, result) => {
        try {

            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No project with given id (${req.params.id}) was found`));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Project retrieved', result[0] ));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

router.post('/', async (req, res) => {
    console.log('Creating project');
    database.query(queries.CREATE_PROJECT, Object.values(req.body), (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                const project = { id: result.insertedId, ...req.body };
                res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Project created successfully', { project }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

router.put('/:id', async (req, res) => {
    console.log('Updating project');
    database.query(queries.SELECT_PROJECT, [req.params.id], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No project with given id (${req.params.id}) was found`));
            } else {
                database.query(queries.UPDATE_PROJECT, [...Object.values(req.body), req.params.id], (err, result) => {
                    if(!err) {
                        res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Project updated', { id: req.params.id, ...req.body } ));
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
})

router.delete('/:id', async (req, res) => {
    console.log('Deleting project');
    database.query(queries.DELETE_PROJECT, [req.params.id], (err, result) => {
        try {
            if(result.affectedRows > 0) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Project deleted'));
            } else {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No project with given id (${req.params.id}) was found`));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

router.get('/*', async (req, res) => {
    
    const count = parseInt(req.query.count);
    const page = parseInt(req.query.page);

    database.query(queries.SELECT_PROJECTS, [page*count, count], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No projects found'));
            } else {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Projects retrieved', { projects: result }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

module.exports = router;
