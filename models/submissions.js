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

async function list(userId) {
  try {
    const user = await knex('user').where({ id: userId }).first()
    if (user.type === 'admin')
      return await knex('submissions')
    else if (user.type === 'proofreader') {
      //lista as submissoes que pertencem a esse revisor, mas que ele ainda nao revisou
      const query = `select * from submissions as s
                      where s.id not in 
                        (select p.submission_id from proofreads as p where p.user_id = ?)
                        and s.id in (??)`
      let pr = (await knex.raw(query, [userId, user.sub_ids])).rows
      return {
        proofreader_submissions: pr,
        own_submissions: await knex('submissions').where({ user_id: userId })
      }
    }
    else
      return await knex('submissions').where({ user_id: userId })
  } catch (err) {
    throw err
  }
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
