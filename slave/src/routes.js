const routes = require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer');
const fs = require('fs');
const arq = require('./models/arq');
const csv = require('csv-parser');
const { response } = require('express');
var request = require('request');
const { default: axios } = require('axios');

routes.get("/ready/file/:fileName", async (req, res) => {
    var data = '';

    var config = {
        method: 'get',
        url: 'http://localhost:3001/ready/file/myFile0',
        headers: {},
        data: data
    };

    axios(config)
        .then(function (response) {
            const values = response.data.data
            res.send({ data: values  });
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = routes;