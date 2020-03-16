const { Connector } = require('ylz-connector');

const { config } = require('../config');


class IamService {
  async getUserByEmail(email) {
    const { iamServiceUri } = config;

    const requestOptions = {
      method: 'GET',
      baseURL: iamServiceUri,
      url: `/api/users/query/${email}`,
      // data: input
    };

    const user = await Connector.requestApi(requestOptions);

    return user
      ? {
        id: user.id
      }
      : null;
  }
}

module.exports = new IamService();
