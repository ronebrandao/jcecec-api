const knex = require("../config/knex").knex;

async function findOne(id) {
  return await knex("minicursos")
    .where({ id: id })
    .first();
}

async function findSubscrition(userId, minicourseId) {
  return await knex("user_x_minicursos")
    .where({
      user_id: userId,
      minicourse_id: minicourseId
    })
    .first();
}

async function setSubscription(userId, minicourseId) {
  try {
    course = await findOne(minicourseId);

    if (course.vagas === 0) {
      throw new Error(`O minicurso ${course.titulo} preencheu todas as vagas.`);
    }

    await knex("user_x_minicursos").insert({
      user_id: userId,
      minicourse_id: minicourseId
    });

    await knex("minicursos")
      .update({ vagas: course.vagas - 1 })
      .where({ id: minicourseId });
  } catch (error) {
    throw error;
  }
}

async function setUnsubscription(userId, minicourseId) {
  try {
    await knex("user_x_minicursos")
      .delete()
      .where({
        user_id: userId,
        minicourse_id: minicourseId
      });

    await knex("minicursos")
      .where({ id: minicourseId })
      .increment("vagas");
  } catch (error) {
    throw error;
  }
}

async function list() {
  return await knex
    .select("id", "titulo", "instrutor", "data", "vagas")
    .from("minicursos");
}

async function subscribe(userId, minicourseId) {
  try {
    result = await findSubscrition(userId, minicourseId);

    if (result) {
      throw new Error("Usuário já está inscrito em um minicurso.");
    }

    return await setSubscription(userId, minicourseId);
  } catch (error) {
    throw error;
  }
}

async function unsubscribe(userId, minicourseId) {
  try {
    result = await findSubscrition(userId, minicourseId);

    if (!result) {
      throw new Error("Usuário não está inscrito neste minicurso.");
    }

    await setUnsubscription(userId, minicourseId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findOne,
  list,
  subscribe,
  unsubscribe
};
