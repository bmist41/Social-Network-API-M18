const router = require('express').Router();
const {

} = require('../../controllers/thoughtsController');

// /api/students


// /api/students/:studentId


// /api/students/:studentId/assignments


// /api/students/:studentId/assignments/:assignmentId


router.use('/thoughts/:thoughtId/reactions', reactionRoutes);

module.exports = router;
