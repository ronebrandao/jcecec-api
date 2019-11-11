const knex = require('../config/knex').knex
const moment = require("moment")

function findOne(sigla) {    
    return new Promise(async (resolve, reject) => {
        await knex("instituicoes").where({sigla: sigla}).first()
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

function list() {
    console.log("OAP");
    return new Promise(async (resolve, reject) => {
        await knex("instituicoes")
        .then(data => {
            console.log(data);
            resolve(data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

module.exports = {
    findOne: findOne,
    list: list,
}