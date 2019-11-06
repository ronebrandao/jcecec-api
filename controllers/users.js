const users = require("../models/users");
const email = require("../helpers/email/sender");
const knex = require("../config/knex").knex;
const asyncHandler = require('express-async-handler')

exports.list = (req, res) => {
  users
    .list()
    .then(data => {
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.listAllUsersExcept = (req, res) => {
  users.listAllUsersExcept(req.params.id)
    .then(resp => {
      res.status(200).json({
        success: true,
        data: resp
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      })
    })
}

exports.create = (req, res) => {
  const body = req.body;

  users
    .findOne(body.email)
    .then(student => {
      if (!student) {
        users
          .create(body)
          .then(async result => {

            try {
              await email.sendSubscriptionEmail(result.email, result.name);

              res.status(200).json({
                success: true,
                data: result
              });
            } catch (error) {
              res.status(500).json({
                success: false,
                message: error
              });
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              success: false,
              message: error
            });
          });

        return;
      }

      res.status(200).json({
        success: false,
        code: "user_exists",
        message: "Usuário já cadastrado"
      });
    })
    .catch(error => {
      console.log("ERROR", error);
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.update = async (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  console.log(body);

  let data = {};

  if (body.name) {
    data.name = body.name;
  }
  if (body.email) {
    data.email = body.email;
  }
  if (body.birthDate) {
    data.birth_date = body.birthDate;
  }
  if (body.institution) {
    data.institution = body.institution;
  }
  if (body.type) {
    data.type = body.type;
  }
  if (body.cep) {
    data.cep = body.cep;
  }
  if (body.street) {
    data.street = body.street;
  }
  if (body.streetNumber) {
    data.street_number = body.streetNumber;
  }
  if (body.neighborhood) {
    data.neighborhood = body.neighborhood;
  }
  if (body.state) {
    data.state = body.state;
  }
  if (body.city) {
    data.city = body.city;
  }
  if (body.complement) {
    data.complement = body.complement;
  }

  users
    .findOne(userId)
    .then(user => {
      if (user) {
        users
          .update(userId, data)
          .then(() => {
            res.status(200).json({
              success: true
            });
          })
          .catch(error => {
            res.status(500).json({
              success: false,
              message: error
            });
          });

        return;
      }

      res.status(404).json({
        success: false,
        code: "user_not_found",
        message: "Usuário não encontrado"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.updateSubmissionIds = asyncHandler(async (req, res) => {
  const submissionId = req.params.id;
  const body = req.body;

  if (body.proofreaders) {
    const trans = await knex.transaction();
    try {

      for (let userId of body.proofreaders) {

        if (userId != null) {
          let user = await trans.select("sub_ids", "name", "email").from("user").where({ id: userId }).first()
          
          let sub_ids = user.sub_ids || [];
          sub_ids.push(submissionId);

          await trans("user").update({ sub_ids: sub_ids }).where({ id: userId });

          let submission = await trans.select("title").from("submissions").where({ id: submissionId }).first();
          
          await email.sendProofreadSetEmail(user.email, user.name, submission.title);
        }
      }

      await trans("submissions").update({ has_proofreaders: true, status: "revisao" }).where({ id: submissionId });

      trans.rollback();
      res.status(200).send();
    }
    catch (error) {
      trans.rollback();
      res.status(500).json({
        message: error
      });
    }
  } else {
    res.status(400).json({
      message: "Proofreaders is a required field"
    });
  }
});

exports.get = (req, res) => {
  const email = req.params.id;

  users
    .findOne(email)
    .then(result => {
      if (result) {
        res.status(200).json({
          success: true,
          data: result
        });

        return;
      }

      res.status(404).json({
        success: false,
        code: "user_not_found",
        message: "Usuário não encontrado"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};
