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
    return new Promise(async (resolve, reject) => {
        await knex("instituicoes")
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    findOne: findOne,
    list: list,
}