const routes = require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer');
const fs = require('fs');
const arq = require('./models/arq');
const csv = require('csv-parser')

routes.post('/add/file', multer(multerConfig).single('file'), async (req, res) => {
    const post = await arq.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        arquivo: req.body.imagem,
        userId: req.body.token
    })
    return res.json(post);
});

routes.get("/ready/file/:fileName", async (req, res) => {
    const { fileName } = req.params
    const results = []
    if (fs.existsSync(`./uploads/${fileName}.csv`)) {
        fs.createReadStream(`./uploads/${fileName}.csv`)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                return res.send({ data: results });
            });
    } else {
        return res.status(400).send({ error: 'file not found' });
    }
});

module.exports = routes;