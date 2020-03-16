const projectDomainInstance = require('../../domains/ProjectDomain');

class ProjectController {
  async getAll(req, res, next) {
    try {
      const projects = await projectDomainInstance.getAll();

      res.json(projects);
    } catch(err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const project = await projectDomainInstance.get(id);

      res.json(project);
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { id: userId } = res.locals.user;
      const { name } = req.body;

      const id = await projectDomainInstance.create({ name, userId });

      res.status(201).json({ id });
    } catch(err) {
      next(err);
    }
  }

  async addMember(req, res, next) {
    try {
      const { id: userId, token } = res.locals.user;
      const { id } = req.params;
      const { email } = req.body;

      try {
        await projectDomainInstance.addMember({ id, email, userId, token });
      } catch(err) {
        if(err.code) {
          return res.status(err.code).json({ message: err.message });
        }
      }

      return res.send();
    } catch(err) {
      next(err);
    }
  }

  async addDevice(req, res, next) {
    try {
      const { id: userId } = res.locals.user;
      const { key } = req.params;
      const { deviceId } = req.body;

      const id = await projectDomainInstance.create({ name, owner: userId, createdBy: userId });

      res.status(201).json({ id });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new ProjectController();