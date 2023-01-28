const router = require('express').Router();

const usersRoutes = require('./usersRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', usersRoutes);
// router.use('/blogposts', blogpostRoutes);
// router.use('/comments', commentsRoutes);

module.exports = router;