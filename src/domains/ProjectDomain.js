const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

const projectRepositoryInstance = require('../repositories/ProjectRepository');
const iamServiceInstance = require('../services/IamService');
const deviceServiceInstance = require('../services/DeviceService');


class ProjectDomain {
  async get(id) {
    return await projectRepositoryInstance.get(id);
  }

  async getAll() {
    return await projectRepositoryInstance.getAll();
  }

  async create({ name, userId }) {
    return await projectRepositoryInstance.create({ name, owner: userId, createdBy: userId});
  }

  async addMember({ id, email, userId, token }) {
    const project = await this.get(id);

    if(!project) {
      const error = Error('Project not found!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    if(project.owner !== userId) {
      const error = Error('Not authorized to perform this operation!');
      error.code = HttpStatusCode.FORBIDDEN;

      throw error;
    }

    const user = await iamServiceInstance.getUserByEmail({ email, token });

    if(!user) {
      const error = Error('User not found!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    if(project.owner === user.id) {
      const error = Error('Already the owner!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    if(project.members.includes(user.id)) {
      const error = Error('Already a member!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    project.members.push(user.id);

    await projectRepositoryInstance.update({ id, members: project.members });
  }

  async addDevice({ id, deviceId, userId, token }) {
    const project = await this.get(id);

    if(!project) {
      const error = Error('Project not found!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    if(project.owner !== userId) {
      const error = Error('Not authorized to perform this operation!');
      error.code = HttpStatusCode.FORBIDDEN;

      throw error;
    }

    const device = await deviceServiceInstance.get({ deviceId, token });

    if(!device) {
      const error = Error('Device not found!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    if(project.devices.includes(deviceId)) {
      const error = Error('Already added!');
      error.code = HttpStatusCode.BAD_REQUEST;

      throw error;
    }

    project.devices.push(deviceId);

    await projectRepositoryInstance.update({ id, devices: project.devices });
  }
}

module.exports = new ProjectDomain();
