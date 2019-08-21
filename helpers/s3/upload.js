const AWS = require("aws-sdk");
const uuidv1 = require("uuid/v1");

const uploadS3 = file => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2"
  });

  const params = {
    Bucket: "jcecec-submissions",
    Key: uuidv1() + ".pdf",
    Body: file,
    ContentType: "application/pdf"
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function(s3Err, data) {
      if (s3Err) {
        console.log("Erro ao fazer upload para o S3", s3Err);
        reject(s3Err);
      }

      console.log("Arquivo carregado com sucesso.", data);
      resolve(data);
    });
  });
};

module.exports = uploadS3;
