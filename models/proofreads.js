const knex = require("../config/knex").knex;
const moment = require("moment");

function findOne(submissionId) {
  return new Promise(async (resolve, reject) => {
    await knex("proofreads")
      .where({ submission_id: submissionId })
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
    await knex("proofreads")
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
    await knex("proofreads")
      .insert({
        submission_id: data.submissionId,
        contribuicao: data.contribuicao,
        qualidade: data.qualidade,
        organizacao: data.organizacao,
        recomendacao: data.recomendacao,
        cofianca_revisor: data.cofiancaRevisor,
        categoria: data.categoria,
        indicacao: data.indicacao,
        mensagem_autor: data.mensagemAutor,
        mensagem_organizacao: data.mensagemOrganizacao,
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

function update(userId, data) {
  return new Promise(async (resolve, reject) => {
    await knex("proofreads")
      .where({ user_id: userId })
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
  list: list,
  create: create,
  update: update
};
