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

async function listSummary(submissionId) {
  console.log(await knex.raw(`
  SELECT  round(avg(originalidade)) as originalidade,
        round(avg(contribuicao)) as contribuicao,
        round(avg(qualidade))   as qualidade,
        round(avg(organizacao))  as organizacao,
        round(avg(recomendacao)) as recomendacao,
        round(avg(confianca_revisor)) as confianca,
        STRING_AGG (categoria, '|') categorias,
        COUNT(*) as revisoes
  FROM public.proofreads
  WHERE submission_id 
  `))
}

async function create(data) {
  try {
    return await knex("proofreads")
      .insert({
        submission_id: data.submissionId,
        contribuicao: data.contribuicao,
        qualidade: data.qualidade,
        organizacao: data.organizacao,
        recomendacao: data.recomendacao,
        confianca_revisor: data.confiancaRevisor,
        categoria: data.categoria,
        indicacao: data.indicacao,
        originalidade: data.originalidade,
        mensagem_organizacao: data.mensagemOrganizacao,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      })
  } catch (err) {
    throw err
  }
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
