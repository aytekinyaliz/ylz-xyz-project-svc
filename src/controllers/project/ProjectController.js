const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

const projectDomainInstance = require('../../domains/ProjectDomain');

class ProjectController {
  async getAll(req, res, next) {
    try {
      const { id: userId, token } = res.locals.user;

      const projects = await projectDomainInstance.getAll({ userId, token });

      res.json(projects);
    } catch(err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const { token } = res.locals.user;
      const { id } = req.params;

      const project = await projectDomainInstance.get({ id, token });

      res.json(project);
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { id: userId } = res.locals.user;
      const { name } = req.body;

      if(!name) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid format!' });
      }

      const id = await projectDomainInstance.create({ name, userId });

      res.status(HttpStatusCode.CREATED).json({ id });
    } catch(err) {
      next(err);
    }
  }

  async addMember(req, res, next) {
    try {
      const { id: userId, token } = res.locals.user;
      const { id } = req.params;
      const { email } = req.body;

      if(!id || !email) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid format!' });
      }

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
      const { id: userId, token } = res.locals.user;
      const { id } = req.params;
      const { deviceId } = req.body;

      if(!id || !deviceId) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid format!' });
      }

      try {
        await projectDomainInstance.addDevice({ id, deviceId, userId, token });
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
}

module.exports = new ProjectController();