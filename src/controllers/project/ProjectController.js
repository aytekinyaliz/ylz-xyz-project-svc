const projectDomainInstance = require('../../domains/ProjectDomain');

class ProjectController {
  async getOne(req, res, next) {
    try {
      const key = req.params.key;

      const user = await projectDomainInstance.get(key);

      res.json(user);
    } catch(err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectDomainInstance.getAll();

      res.json(projects);
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const project = req.body;

      const id = await projectDomainInstance.create(project);

      res.status(201).json({ id });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new ProjectController();