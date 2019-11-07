const proofreads = require("../models/proofreads");

exports.list = (req, res) => {
  proofreads
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

exports.listSummary = (req, res) => {
  proofreads
    .listSummary(req.params.id)
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

exports.create = (req, res) => {
  const body = req.body;

  proofreads
    .create(body)
    .then(() => {
      res.status(200).json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.update = (req, res) => {
  const submissionId = req.params.id;
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

  proofreads
    .findOne(submissionId)
    .then(user => {
      if (user) {
        users
          .update(submissionId, data)
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
        code: "proofread_not_found",
        message: "Revisão não encontrada"
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
  const submissionId = req.params.id;

  proofreads
    .findOne(submissionId)
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
        code: "proofread_not_found",
        message: "Revisão não encontrada"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};
