const { Connector } = require('@ylz/connector/dist');

const config = require('../config');


class IamService {
  async getAll({ token }) {
    const { iamServiceUri } = config;

    const requestOptions = {
      method: 'GET',
      baseURL: iamServiceUri,
      url: `/api/users`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      // data: input
    };

    return await new Connector().requestApi(requestOptions);
  }
  async getUserByEmail({ email, token }) {
    const { iamServiceUri } = config;

    const requestOptions = {
      method: 'GET',
      baseURL: iamServiceUri,
      url: `/api/users/query?email=${email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      // data: input
    };

    const user = await new Connector().requestApi(requestOptions);

    return user
      ? {
        id: user.id
      }
      : null;
  }
}

module.exports = new IamService();
