const { Router } = require('express');
const { authLevel, authMiddleware } = require('ylz-xyz-auth-mdw');

const projectControllerInstance = require('./ProjectController');

const router = Router();

router.route('/').get(
  authMiddleware(authLevel.private),
  projectControllerInstance.getAll
);

router.route('/:id').get(
  authMiddleware(authLevel.private),
  projectControllerInstance.getOne
);

router.route('/:id/addMember').put(
  authMiddleware(authLevel.private),
  projectControllerInstance.addMember
);

router.route('/:id/addDevice').put(
  authMiddleware(authLevel.private),
  projectControllerInstance.addDevice
);

router.route('/').post(
  authMiddleware(authLevel.private),
  projectControllerInstance.create
);

module.exports = router;