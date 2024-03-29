const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10",
  accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY,
});

exports.handler = (event, _, cb) => {
  const { slug, likes } = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMO_LIKES_TABLE,
    Key: {
      slug: {
        S: slug,
      },
    },
    UpdateExpression: "set likes = :l",
    ExpressionAttributeValues: {
      ":l": {
        N: `${likes}`,
      },
    },
    ReturnValues: "UPDATED_NEW",
  };

  dynamoDB.updateItem(params, (err, data) => {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      const { likes } = AWS.DynamoDB.Converter.unmarshall(data.Item);
      const response = {
        statusCode: 200,
        body: JSON.stringify(likes),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
      cb(null, response);
    }
  });
};
