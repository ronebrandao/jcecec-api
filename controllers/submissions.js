const submissions = require("../models/submissions");
const users = require("../models/users");

const uploadS3 = require("../helpers/s3/upload");
const downloadS3 = require("../helpers/s3/download");

const email = require("../helpers/email/sender");

exports.list = (req, res) => {
  submissions
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

exports.create = async (req, res) => {
  const body = req.body;
  //Buffer is the memorystream of the file. It works fine.
  uploadS3(req.file.buffer)
    .then(data => {
      body.fileUrl = data.Location;

      submissions
        .create(body)
        .then(async () => {
          try {
            const user = await users.findOneById(body.userId);

            await email.sendSubmissionSentEmail(user.email, user.name, body.title);

            res.status(200).json({
              success: true
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
  if (body.proofreaders) {
    data.proofreaders = body.proofreaders;
  }

  submissions
    .findOne(submissionId)
    .then(submission => {
      if (submission) {
        submissions
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
      console.log("ERRO", error);
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.get = (req, res) => {
  const userId = req.params.id;

  submissions
    .find(userId)
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

exports.getFile = (req, res) => {
  const fileName = req.params.id;

  res.setHeader("Content-disposition", "attachment; filename=" + fileName);
  res.setHeader("Content-type", "application/pdf");

  downloadS3(fileName)
    .createReadStream()
    .on("error", error => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error
      });
    })
    .pipe(res);
};
