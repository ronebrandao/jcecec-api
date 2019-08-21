const AWS = require("aws-sdk");

const downloadS3 = url => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2"
  });

  const params = {
    Bucket: "jcecec-submissions",
    Key: url
  };

  return s3.getObject(params);
};

module.exports = downloadS3;
