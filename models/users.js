const knex = require('../config/knex').knex
const moment = require("moment")

function findOne(email) {    
    return new Promise(async (resolve, reject) => {
        await knex("user").where({email: email}).first()
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
        await knex("user")
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

function create(data) {
    return new Promise(async (resolve, reject) => {
        await knex("user")
        .insert({
            name: data.name,
            family_name: data.familyName,   
            email: data.email,
            birth_date: data.birthDate,
            institution: data.institution,
            type: data.type,
            subscribed: data.subscribed,
            cep: data.cep,
            street: data.street,
            street_number: data.street_number,
            neighborhood: data.neighborhood,
            state: data.state,
            city: data.city,
            complement: data.complement,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .then(data => {
            resolve(true)
        })
        .catch(error => {
            reject(error)
        })
    })
}

function update(id, data) {
    return new Promise(async (resolve, reject) => {
        await knex("user").where({id: id}).update(data)
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
    create: create,
    update: update
}