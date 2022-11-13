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
    
    DELETE_PARTICIPANT: 'DELETE FROM participants WHERE patient_id = ? AND project_ID = ?',
    UPDATE_PARTICIPANT: 'UPDATE participants SET consent = ? WHERE patient_id = ? AND project_id = ?',

    ADD_PARTICIPANT: 'INSERT INTO participants (project_id, patient_id, consent) VALUES (?, ?, FALSE)',
    GET_PARTICIPANT_INFO: 'SELECT * FROM patients pat, participants part WHERE part.patient_id = pat.id AND pat.id = ? AND part.project_id = ?',
    GET_PARTICIPANT_ORDERS: 'SELECT ord.project_id, ord.order_id, ord.title, exam_ord.examination_id, exam.title FROM orders ord, examinations_order exam_ord, examinations exam WHERE project_id = ? AND exam_ord.order_id = ord.order_id AND exam.examination_id = exam_ord.examination_id ORDER BY ord.order_id',

    COUNT_PROJECTS: 'SELECT COUNT(*) AS projectsCount FROM projects',
};

const normalizeResult = (result) => {
    return Object.assign({}, result[0]);
}

/**
 * 
 * -------------------------------- POST METHODS --------------------------------
 * 
 */

router.post('/add-participant', async (req, res) => {
    database.query(queries.ADD_PARTICIPANT, [req.body.project_id, req.body.patient_id], (err, result) => {
        try {
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Dodano pacjenta do projektu', { project_id: req.body.project_id }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

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
});

/**
 * 
 * -------------------------------- PUT METHODS --------------------------------
 * 
 */

router.put('/update-participant', async (req, res) => {
    try {
        database.query(queries.UPDATE_PARTICIPANT, [req.body.consent, req.body.patientID, req.body.projectID], (err, result) => {
            if(!err) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Zaktualizowano dane uczestnika'));
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Internal Server Error`));
            }
        });
    } catch(err) {
        console.log(err);
        res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
    }
});

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

/**
 * 
 * -------------------------------- DELETE METHODS --------------------------------
 * 
 */

router.delete('/remove-participant', async (req, res) => {
    database.query(queries.DELETE_PARTICIPANT, [req.body.patientID, req.body.projectID], (err, result) => {
        try {
            if(result.affectedRows > 0) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Usunięto pacjenta z projektu'));
            } else {
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Uczestnik (id: ${req.body.patientID}) nie jest przypisany do projektu (id: ${req.body.projectID})`));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

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
});

/**
 * 
 * -------------------------------- GET METHODS --------------------------------
 * 
 */

router.get('/:projectID/get-participant/:patientID/orders', async (req, res) => {
    database.query(queries.GET_PARTICIPANT_ORDERS, [parseInt(req.params.patientID), parseInt(req.params.projectID)], (err, result) => {
        try {
            if (result.length < 1) {
                console.log(result);
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, '404 not found'));
                return;
            }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { item: result[0] }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/:projectID/get-participant/:patientID', async (req, res) => {
    database.query(queries.GET_PARTICIPANT_INFO, [parseInt(req.params.patientID), parseInt(req.params.projectID)], (err, result) => {
        try {
            if (result.length < 1) {
                console.log(result);
                res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, '404 not found'));
                return;
            }
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { item: result[0] }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/participants-count', async (req, res) => {
    const projectIdQuery = parseInt(req.query.projectID);

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
        AND date_of_birth LIKE '${date_of_birthQuery}%'
        AND id IN (SELECT patient_id FROM participants WHERE project_id = ${projectIdQuery})`;

    database.query(query, (err, result) => {
        try {
            const normalResult = normalizeResult(result);
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { patientsCount: normalResult.patientsCount }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/not-participants-count', async (req, res) => {
    const projectIdQuery = parseInt(req.query.projectID);

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
        AND date_of_birth LIKE '${date_of_birthQuery}%'
        AND id NOT IN (SELECT patient_id FROM participants WHERE project_id = ${projectIdQuery})`;

    database.query(query, (err, result) => {
        try {
            const normalResult = normalizeResult(result);
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { patientsCount: normalResult.patientsCount }));
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

router.get('/get-participants', async (req, res) => {
    const count = parseInt(req.query.count);
    const page = parseInt(req.query.page);
    const orderByColumn = req.query.orderByColumn;
    const order = req.query.order;

    const projectIdQuery = parseInt(req.query.projectID);
    const idQuery = req.query.idQuery || '';
    const first_nameQuery = req.query.first_nameQuery || '';
    const last_nameQuery = req.query.last_nameQuery || '';
    const emailQuery = req.query.emailQuery || '';
    const addressQuery = req.query.addressQuery || '';
    const cityQuery = req.query.cityQuery || '';
    const countryQuery = req.query.countryQuery || '';
    const date_of_birthQuery = req.query.date_of_birthQuery || '';

    const query = `
        SELECT *, (SELECT consent from participants part where part.patient_id = p.id and part.project_id = ${projectIdQuery}) AS consent FROM patients p 
        WHERE p.id LIKE '%${idQuery}%'
        AND p.first_name LIKE '%${first_nameQuery}%'
        AND p.last_name LIKE '%${last_nameQuery}%'
        AND p.email LIKE '%${emailQuery}%'
        AND p.address LIKE '%${addressQuery}%'
        AND p.city LIKE '%${cityQuery}%'
        AND p.country LIKE '%${countryQuery}%'
        AND p.date_of_birth LIKE '%${date_of_birthQuery}%'
        AND p.id IN (SELECT patient_id FROM participants WHERE project_id = ${projectIdQuery})
        ORDER BY ${orderByColumn} ${order} LIMIT ${page*count}, ${count}`;

    database.query(query, (err, result) => {
        try {
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

router.get('/get-not-participants', async (req, res) => {
    const count = parseInt(req.query.count);
    const page = parseInt(req.query.page);
    const orderByColumn = req.query.orderByColumn;
    const order = req.query.order;

    const projectIdQuery = parseInt(req.query.projectID);
    const idQuery = req.query.idQuery || '';
    const first_nameQuery = req.query.first_nameQuery || '';
    const last_nameQuery = req.query.last_nameQuery || '';
    const emailQuery = req.query.emailQuery || '';
    const addressQuery = req.query.addressQuery || '';
    const cityQuery = req.query.cityQuery || '';
    const countryQuery = req.query.countryQuery || '';
    const date_of_birthQuery = req.query.date_of_birthQuery || '';

    const query = `
        SELECT * FROM patients p 
        WHERE p.id LIKE '%${idQuery}%'
        AND p.first_name LIKE '%${first_nameQuery}%'
        AND p.last_name LIKE '%${last_nameQuery}%'
        AND p.email LIKE '%${emailQuery}%'
        AND p.address LIKE '%${addressQuery}%'
        AND p.city LIKE '%${cityQuery}%'
        AND p.country LIKE '%${countryQuery}%'
        AND p.date_of_birth LIKE '%${date_of_birthQuery}%'
        AND p.id NOT IN (SELECT patient_id FROM participants WHERE project_id = ${projectIdQuery})
        ORDER BY ${orderByColumn} ${order} LIMIT ${page*count}, ${count}`;

    database.query(query, (err, result) => {
        try {
            if(err) { throw new Error(`Error running query:\n ${err}`); }
            if(!result) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
            } else {
                var resultArray = [];
                result.forEach(element => {
                    resultArray.push(Object.assign({}, element));
                });
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'OK', { items: resultArray }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

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
});

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
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Projects retrieved', { items: result }));
            }
        } catch(err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Bad request'));
        }
    });
});

module.exports = router;
