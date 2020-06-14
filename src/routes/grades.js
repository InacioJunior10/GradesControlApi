import express from 'express';
import { promises, readSync } from 'fs';

const router = express.Router();
const fs = promises;
let pathFile = './src/assets/grades.json';

router.post('/', async (req, res) => {
    try {
        let grade = req.body;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);

        grade.timestamp = new Date();
        grade = { id: jsonData.nextId++, ...grade };
        jsonData.grades.push(grade);

        await fs.writeFile(pathFile, JSON.stringify(jsonData));
        res.send(grade);

        logger.info(`POST /grade - ${JSON.stringify(grade)}`);
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`POST /grade - ${ex.message}`);
    }
});

router.put('/', async (req, res) => {
    try {
        let newGrade = req.body;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);
        let oldIndex = jsonData.grades.findIndex((x) => x.id === parseInt(newGrade.id));

        if (oldIndex < 0) {
            logger.info('PUT /grade - Nenhum registro encontrado!');
            return res.status(400).send('Nenhum registro encontrado!');
        }

        newGrade.timestamp = jsonData.grades[oldIndex].timestamp;
        jsonData.grades[oldIndex] = newGrade;
        await fs.writeFile(pathFile, JSON.stringify(jsonData));

        res.send(newGrade);

        logger.info(`PUT /grade - ${JSON.stringify(newGrade)}`);
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`PUT /grade - ${ex.message}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await fs.readFile(pathFile, 'utf-8');
        let jsonData = JSON.parse(data);

        let register = jsonData.grades.filter((x) => x.id === parseInt(id, 10));
        if (register.length === 0) {
            logger.info(`DELETE /grade - Nenhum registro encontrado com o id ${id}!`);
            return res.status(400).send(`Nenhum registro encontrado com o id ${id}!`);
        }

        let grade = jsonData.grades.filter((x) => x.id !== parseInt(id, 10));

        jsonData.grades = grade;
        await fs.writeFile(pathFile, JSON.stringify(jsonData));

        res.send('Registro deletado com sucesso!');
        logger.info(`DELETE /grade/:id - ${id}`);
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`DELETE /grade - ${ex.message}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);
        let grade = jsonData.grades.find((x) => x.id === parseInt(id, 10));

        if (grade) {
            res.send(grade);
            logger.info(`GET /grade/:id - ${id}`);
        } else {
            res.status(400).send(`Nenhum registro encontrado com o id ${id}!`);
            logger.info(`GET /grade/:id - Nenhum registro encontrado com o id ${id}!`);
        }
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`GET /grade/id - ${ex.message}`);
    }
});

router.get('/', async (_, res) => {
    try {
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);
        delete jsonData.nextId;
        res.send(jsonData);
        logger.info(`GET /grade - ${jsonData}`);
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`GET /grade - ${ex.message}`);
    }
});

router.get('/:student/:subject', async (req, res) => {
    try {
        let student = req.params.student;
        let subject = req.params.subject;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);

        let grade = jsonData.grades.filter((x) => x.student === student && x.subject === subject);

        if (grade.length > 0) {
            // Fazer a soma aqui...
            let totalNotas = Object.values(grade).reduce((totalNotas, { value }) => totalNotas + value, 0);
            res.send({ totalNotas: totalNotas });
            logger.info(`GET /grade/:student/:subject - ${totalNotas}`);
        } else {
            res.status(400).send(`Nenhum registro encontrado!`);
            logger.info('GET /grade/:student/:subject - Nenhum registro encontrado!');
        }
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`GET /grade/:student/:subject - ${ex.message}`);
    }
});

router.get('/media/:subject/:type', async (req, res) => {
    try {
        let type = req.params.type;
        let subject = req.params.subject;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);

        let grade = jsonData.grades.filter((x) => x.type === type && x.subject === subject);

        if (grade.length > 0) {
            // Fazer a soma aqui...
            let totalNotas = Object.values(grade).reduce((totalNotas, { value }) => totalNotas + value, 0);
            let media = totalNotas / grade.length;
            res.send({ mediaGrades: media });
            logger.info(`GET grade/media/:subject/:type - ${media}`);
        } else {
            res.status(400).send(`Nenhum registro encontrado!`);
            logger.info(`GET grade/media/:subject/:type - Nenhum registro encontrado!`);
        }
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`GET grade/media/:subject/:type - ${ex.message}`);
    }
});

router.get('/melhor/:subject/:type', async (req, res) => {
    try {
        let type = req.params.type;
        let subject = req.params.subject;
        let data = await fs.readFile(pathFile, 'utf8');
        let jsonData = JSON.parse(data);

        let grade = jsonData.grades.filter((x) => x.type === type && x.subject === subject);

        if (grade.length > 0) {
            // Melhores Registros
            let register = [];
            register = grade.sort((a, b) => {
                return b.value - a.value;
            });

            res.send({ maiorValue: register.splice(0, 3) });
            logger.info(`GET grade/melhor/:subject/:type - ${JSON.stringify(register.splice(0, 3))}`);
        } else {
            res.status(400).send(`Nenhum registro encontrado!`);
            logger.info(`GET grade/melhor/:subject/:type - Nenhum registro encontrado!`);
        }
    } catch (ex) {
        res.status(400).send({ error: ex.message });
        logger.error(`GET grade/melhor/:subject/:type - ${ex.message}`);
    }
});

export default router;
