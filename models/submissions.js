const knex = require("../config/knex").knex;

const moment = require("moment");

function find(userId) {
  return new Promise(async (resolve, reject) => {
    await knex("submissions")
      .where({ user_id: userId })
      .orderBy("created_at", "desc")
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

function findOne(submissionId) {
  return new Promise(async (resolve, reject) => {
    await knex("submissions")
      .where({ id: submissionId })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function list() {
  return new Promise(async (resolve, reject) => {
    await knex("submissions")
      .orderBy("created_at", "desc")
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function create(data) {
  return new Promise(async (resolve, reject) => {
    await knex("submissions")
      .insert({
        user_id: data.userId,
        title: data.title,
        file_url: data.fileUrl,
        status: data.status,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      })
      .then(data => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function update(submissionId, data) {
  return new Promise(async (resolve, reject) => {
    await knex("submissions")
      .where({ id: submissionId })
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
  find: find,
  list: list,
  create: create,
  update: update
};
