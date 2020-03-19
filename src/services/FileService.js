const { Connector } = require('@ylz/connector/dist');

const config = require('../config');


class FileService {
  // async get({ id, token }) {
  //   const { fileServiceUri } = config;

  //   const requestOptions = {
  //     method: 'GET',
  //     baseURL: fileServiceUri,
  //     url: `/api/files/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     // data: input
  //   };

  //   const device = await new Connector().requestApi(requestOptions);

  //   return device
  //     ? {
  //       id: device.id
  //     }
  //     : null;
  // }

  async query({ projectId, token }) {
    const { fileServiceUri } = config;

    const requestOptions = {
      method: 'GET',
      baseURL: fileServiceUri,
      url: `/api/files/query?projectId=${projectId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      // data: input
    };

    return await new Connector().requestApi(requestOptions);
  }
}

module.exports = new FileService();
