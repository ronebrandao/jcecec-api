const users = require("../models/users");
const email = require("../helpers/email/sender");

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

exports.update = (req, res) => {
  const userId = req.params.id;
  const body = req.body;

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
