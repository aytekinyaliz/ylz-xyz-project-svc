const projectRepositoryInstance = require('../repositories/ProjectRepository');


class ProjectDomain {
  async get(key) {
    return await projectRepositoryInstance.get(key);
  }

  async getAll() {
    return await projectRepositoryInstance.getAll();
  }

  async create(project) {
    return await projectRepositoryInstance.create(project);
  }
}

module.exports = new ProjectDomain();
