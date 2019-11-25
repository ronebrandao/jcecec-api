const knex = require("../config/knex").knex;
const moment = require("moment");
const email = require("../helpers/email/sender");

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

  const query = `
  SELECT  round(avg(originalidade)) as originalidade,
        round(avg(contribuicao)) as contribuicao,
        round(avg(qualidade))   as qualidade,
        round(avg(organizacao))  as organizacao,
        round(avg(recomendacao)) as recomendacao,
        round(avg(confianca_revisor)) as confianca,
        STRING_AGG (categoria, '|') categorias,
        COUNT(*) as revisoes
  FROM public.proofreads
  WHERE submission_id = ?
  `;

  return (await knex.raw(query, submissionId)).rows[0];
}

async function create(data) {
  const trx = await knex.transaction()
  try {
    await trx("proofreads")
      .insert({
        user_id: data.userId,
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

    const submission = await trx.select("title").from('submissions').where({ id: data.submissionId }).first();
    const user = await trx.select("name", "family_name").from('user').where({ id: data.userId }).first();
    let admins = await trx.select('email').from('user').where({ type: 'admin' }).orderBy('id', 'asc').map(x => x.email);


    for (let e of admins) {
      await email.sendProofreadMadeEmail(e, user.name + ' ' + user.family_name, submission.title, data.mensagemOrganizacao)
    }


    trx.commit()

  } catch (err) {
    trx.rollback()
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
  update: update,
  listSummary
};
