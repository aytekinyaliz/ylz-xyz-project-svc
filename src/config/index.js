const dotenv = require("dotenv");

dotenv.config();

const config = {
  apiPrefix: process.env.API_PREFIX,
  deviceServiceUri: process.env.DEVICE_SERVICE_URI,
  iamServiceUri: process.env.IAM_SERVICE_URI,
  fileServiceUri: process.env.FILE_SERVICE_URI,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  firestoreServiceAccount: {
    type: process.env.FIRESTORE_TYPE,
    project_id: process.env.FIRESTORE_PROJECT_ID,
    private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
    private_key: process.env.FIRESTORE_PRIVATE_KEY,
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    client_id: process.env.FIRESTORE_CLIENT_ID,
    auth_uri: process.env.FIRESTORE_AUTH_URI,
    token_uri: process.env.FIRESTORE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL
  }
};

console.log('CONFIGURATIONS:', config);

module.exports = config;