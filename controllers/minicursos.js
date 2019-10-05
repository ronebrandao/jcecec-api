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

exports.get = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    minicurso = await minicursos.findOne(id);

    if (minicurso) {
      result = await minicursos.findSubscrition(userId, id);
      minicurso.subscribed = result ? true : false;
      console.log(minicurso);

      res.status(200).json({
        success: true,
        data: minicurso
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Minicurso não existe"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
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
      status = 500;

      if (err.message.includes("minicurso")) {
        status = 400;
      }

      res.status(status).json({
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
      status = 500;

      if (err.message.includes("minicurso")) {
        status = 400;
      }

      res.status(status).json({
        success: false,
        message: err.message
      });
    });
};
