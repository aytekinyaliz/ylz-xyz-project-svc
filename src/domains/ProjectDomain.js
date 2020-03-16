const projectRepositoryInstance = require('../repositories/ProjectRepository');
const iamServiceInstance = require('../services/IamService');


class ProjectDomain {
  async get(id) {
    return await projectRepositoryInstance.get(id);
  }

  async getAll() {
    return await projectRepositoryInstance.getAll();
  }

  async create(project) {
    return await projectRepositoryInstance.create(project);
  }

  async addMember({ id, email, userId }) {
    const project = this.get(id);

    if(!project) {
      const error = Error('Project not found!');
      error.code = 400;

      throw error;
    }

    if(project.owner !== userId) {
      const error = Error('Not authorized to perform this operation!');
      error.code = 403;

      throw error;
    }

    const user = iamServiceInstance.getUserByEmail(email);

    if(!user) {
      const error = Error('User not found!');
      error.code = 400;

      throw error;
    }

    if(project.members.includes(user.id)) {
      const error = Error('Already a member!');
      error.code = 400;

      throw error;
    }

    project.members.push(user.id)

    await projectRepositoryInstance.updateMembers(project.members);
  }
}

module.exports = new ProjectDomain();
