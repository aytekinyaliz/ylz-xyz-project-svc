const { Router } = require('express');

const projectControllerInstance = require('./ProjectController');


const router = Router();

router.route('/:key').get(
  // auth,
  projectControllerInstance.getOne
);

router.route('/').get(
  // auth,
  projectControllerInstance.getAll
);

router.route('/').post(
  // auth,
  projectControllerInstance.create
);

module.exports = router;