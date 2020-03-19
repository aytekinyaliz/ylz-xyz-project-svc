const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

const projectRepositoryInstance = require('../repositories/ProjectRepository');
const iamServiceInstance = require('../services/IamService');
const deviceServiceInstance = require('../services/DeviceService');
const fileServiceInstance = require('../services/FileService');


class ProjectDomain {
  async get({ token, id }) {
    const project = await projectRepositoryInstance.get(id);

    if(!project) {
      return null;
    }

    const users = await iamServiceInstance.getAll({ token });
    const devices = await deviceServiceInstance.getAll({ token });
    const files = await fileServiceInstance.query({ token, projectId: id });

    const owner = users.find(user => user.id === project.owner);

    return {
      ...project,
      owner: {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName
      },
      members: project.members.map(m => {
        const member = users.find(user => user.id === m);

        return {
          id: member.id,
          firstName: member.firstName,
          lastName: member.lastName
        };
      }),
      devices: project.devices.map(d => {
        const device = devices.find(device => device.id === d);

        return {
          id: device.id,
          serialNumber: device.serialNumber,
          name: device.name
        };
      }),
      files: files
    };

  }

  async getAll({ token }) {
    const projects = await projectRepositoryInstance.getAll();

    if(!projects) {
      return null;
    }

    const users = await iamServiceInstance.getAll({ token });
    const devices = await deviceServiceInstance.getAll({ token });
    const files = await fileServiceInstance.query({ token, projectId: '*' });

    return projects.map(project => {
      const owner = users.find(user => user.id === project.owner);

      return {
        ...project,
        owner: {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName
        },
        members: project.members.map(m => {
          const member = users.find(user => user.id === m);

          return {
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName
          };
        }),
        devices: project.devices.map(d => {
          const device = devices.find(device => device.id === d);

          return {
            id: device.id,
            serialNumber: device.serialNumber,
            name: device.name
          };
        }),
        files: files.filter(file => {
          return file.indexOf(project.id + '_') === 0
        })
      };
    });
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

    const device = await deviceServiceInstance.get({ id: deviceId, token });


    console.log(device);

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

    console.log(project.devices);

    await projectRepositoryInstance.update({ id, devices: project.devices });
  }
}

module.exports = new ProjectDomain();
