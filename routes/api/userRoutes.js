const router = require('express').Router();
const {
  getUsers,
  getSingleUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../../controllers/UserController.js');

// /api/user


// /api/user/:userID
router.use('/:userId/friends/:friendId', friendRoutes);


module.exports = router;
