const users = require("../models/submissions");
const uploadS3 = require("../helpers/s3/upload");

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

exports.create = (req, res) => {
  const body = req.body;
  //Buffer is the memorystream of the file. It works fine.
  uploadS3(req.file.buffer)
    .then(data => {
      body.fileUrl = data.Location;

      users
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
    })
    .catch(error => {
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

  if (body.userId) {
    data.user_id = body.userId;
  }
  if (body.title) {
    data.title = body.title;
  }
  if (body.fileUrl) {
    data.file_url = body.fileUrl;
  }
  if (body.status) {
    data.status = body.status;
  }

  users
    .findOne(submissionId)
    .then(student => {
      if (student) {
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
        code: "submission_not_found",
        message: "Submissão não encontrada"
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

  console.log(submissionId);

  users
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
        code: "submission_not_found",
        message: "Submissão não encontrada"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};
