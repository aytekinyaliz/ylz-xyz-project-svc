const { Connector } = require('@ylz/connector/dist');

const config = require('../config');


class DeviceService {
  async get({ id, token }) {
    const { deviceServiceUri } = config;

    const requestOptions = {
      method: 'GET',
      baseURL: deviceServiceUri,
      url: `/api/devices/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      // data: input
    };

    const device = await new Connector().requestApi(requestOptions);

    return device
      ? {
        id: device.id
      }
      : null;
  }
}

module.exports = new DeviceService();
