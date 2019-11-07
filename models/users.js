const knex = require("../config/knex").knex;
const moment = require("moment");

function findOne(email) {
  return new Promise(async (resolve, reject) => {
    await knex("user")
      .where({ email: email })
      .first()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function findOneById(userId) {
  return await knex("user")
    .where({ id: userId })
    .first();
}

function list() {
  return new Promise(async (resolve, reject) => {
    await knex("user")
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function listAllUsersExcept(userId) {
  return await knex('user').whereNot({ id: userId, type: 'user' }).orderBy('email', 'asc')
}

function create(data) {
  return new Promise(async (resolve, reject) => {
    await knex("user")
      .insert({
        name: data.firstName,
        family_name: data.lastName,
        email: data.email,
        birth_date: data.birthDate,
        institution: data.institution,
        type: data.type,
        subscribed: data.subscribed,
        cep: data.cep,
        street: data.street,
        street_number: data.streetNumber,
        neighborhood: data.neighborhood,
        state: data.state,
        city: data.city,
        complement: data.complement,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      })
      .then(async a => {
        result = await findOne(data.email);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function update(email, data) {
  return new Promise(async (resolve, reject) => {
    await knex("user")
      .where({ email: email })
      .update(data)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  findOne: findOne,
  findOneById,
  list: list,
  create: create,
  update: update,
  listAllUsersExcept
};
