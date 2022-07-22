const routes = require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer');
const fs = require('fs');
const User = require('./models/users');
const csv = require('csv-parser');
const { response } = require('express');
var request = require('request');
const { default: axios } = require('axios');

routes.get("/ready/file/:fileName", async (req, res) => {
    const { fileName } = req.params

    var config = {
        method: 'get',
        url: `http://localhost:3001/ready/file/${fileName}`,
        headers: {},
    };

    const data = await axios(config)
        .then(function (response) {
            return response.data.data
        })
        .catch(function (error) {
            console.log(error);
        });

    data.forEach(element => {
        User.create({ ...element })
    });

    return res.status(200).send({ data })
});

routes.put("/update/:id", async (req, res) => {
    const { id } = req.params
    const user = req.body

    const existentUser = await User.find({id});
    if (!existentUser) {
        return {
            status: false,
            message: 'User not exist!'
        }
    }

    var newUSer = await User.findByIdAndUpdate(existentUser[0]._id, user)
    newUSer = { ...newUSer._doc, ...user }
    return res.status(200).send({ newUSer })
});

routes.get("/listAll", async (req, res) => {
    User.find({}).then(function (users) {
        res.send(users);
    });
});

routes.delete("/delete/user/:id", async (req, res) => {
    const { id } = req.params
    User.findOneAndDelete({ id })
        .then(response => {
            return res.json(response)
        }).catch(erro => {
            return res.json(erro)
        })
});

module.exports = routes;