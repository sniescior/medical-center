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
    DELETE_PROJECT: 'DELETE FROM projects WHERE id = ?',

    COUNT_PROJECTS: 'SELECT COUNT(*) AS projectsCount FROM projects',
};

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

router.get('/get-participants/:id', async (req, res) => {
    const idQuery = req.params.idQuery || ''

    const query = `
        SELECT pat.id, pat.first_name, pat.last_name, part.consent FROM participants part, patients pat
        WHERE part.patient_id = pat.id
        AND part.project_id = ${req.params.id}
    `;

    database.query(query, (err, result) => {
        try {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { patients: result }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

router.get('/count-projects', async (req, res) => {
    const idQuery = req.query.idQuery || '';
    const nameQuery = req.query.nameQuery || '';
    const participantsCountQuery = req.query.participantsCountQuery || '';

    const query = `
        SELECT COUNT(*) AS projectsCount FROM (
            SELECT id, name, IFNULL((
                SELECT COUNT(patient_id) AS counttt FROM participants WHERE project_id = proj.id GROUP BY project_id), 0
                ) AS participantsCount 
            FROM projects proj
            GROUP BY id
            HAVING proj.name LIKE '%${nameQuery}%'
            AND proj.id LIKE '%${idQuery}%'
            AND participantsCount LIKE '%${participantsCountQuery}%'
            ORDER BY id ASC
        ) AS query
    `;

    database.query(query, (err, result) => {
        try {
            const normalResult = normalizeResult(result);
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { projectsCount: normalResult.projectsCount }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    })
});

router.get('/:id', async (req, res) => {
    database.query(queries.SELECT_PROJECT, [req.params.id], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleziono projektu o podanym id (${req.params.id})`));
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
    database.query(queries.CREATE_PROJECT, Object.values(req.body), (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                const project = { id: result.insertId, name: req.body.name };
                res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Stworzono nowy projekt', { project: project }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
})

router.put('/:id', async (req, res) => {
    database.query(queries.SELECT_PROJECT, [req.params.id], (err, result) => {
        try {
            if(!result[0]) {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `No project with given id (${req.params.id}) was found`));
            } else {
                database.query(queries.UPDATE_PROJECT, [req.body.name, req.params.id], (err, result) => {
                    if(!err) {
                        res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Projekt zaktualizowany pomyślnie', { id: req.params.id, ...req.body } ));
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
    database.query(queries.DELETE_PROJECT, [req.params.id], (err, result) => {
        try {
            if(result.affectedRows > 0) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Projekt został usunięty'));
            } else {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleziono projektu (id: ${req.params.id})`));
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
    const orderByColumn = req.query.orderByColumn;
    const order = req.query.order;

    const idQuery = req.query.idQuery || '';
    const nameQuery = req.query.nameQuery || '';
    const participantsCountQuery = req.query.participantsCountQuery || '';

    var query = ``;
    
    if(participantsCountQuery !== '') {
        query = `
        SELECT id, name, IFNULL((SELECT COUNT(patient_id) FROM participants WHERE project_id = proj.id GROUP BY project_id), 0) AS participantsCount
        FROM projects proj
        GROUP BY id
        HAVING proj.id LIKE '%${idQuery}%'
        AND proj.name LIKE '%${nameQuery}%'
        AND participantsCount LIKE '${participantsCountQuery}'
        ORDER BY ${orderByColumn} ${order} LIMIT ${page*count}, ${count}
        `;
    } else {
        query = `
        SELECT id, name, IFNULL((SELECT COUNT(patient_id) FROM participants WHERE project_id = proj.id GROUP BY project_id), 0) AS participantsCount
        FROM projects proj
        GROUP BY id
        HAVING proj.id LIKE '%${idQuery}%'
        AND proj.name LIKE '%${nameQuery}%'
        ORDER BY ${orderByColumn} ${order} LIMIT ${page*count}, ${count}
        `;
    }

    database.query(query, (err, result) => {
        try {
            if(!result) {
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
