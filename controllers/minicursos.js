const minicursos = require("../models/minicursos");

exports.list = (req, res) => {
  minicursos
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

exports.get = (req, res) => {
  const id = req.params.id;

  minicursos
    .findOne(id)
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
        message: "Minicurso não existe"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error
      });
    });
};

exports.subscribe = async (req, res) => {
  const minicourseId = req.params.id;
  const userId = req.params.userId;

  minicursos
    .subscribe(userId, minicourseId)
    .then(result => {
      res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
};

exports.unsubscribe = async (req, res) => {
  const minicourseId = req.params.id;
  const userId = req.params.userId;

  minicursos
    .unsubscribe(userId, minicourseId)
    .then(result => {
      res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
};
