const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {

  try {
      const dbBlogData = await BlogPosts.findAll({
          include: [
              {
                  model: Users,
              },
              {
                  model: Comments,
              },
          ],
      });

      const allBlogs = dbBlogData.map((blogs) =>
          blogs.get({ plain: true })
      );

      console.log(allBlogs)
      res.render('homepage', {
          allBlogs,
          users_id: req.session.users_id,
          logged_in: req.session.logged_in
      })
  } catch (err) {
      res.status(400).json(err);
  }
})

//dashboard page
router.get('/dashboard', async (req, res) => {
  res.render('dashboard')
});

//login page
router.get('/login', async (req, res) => {
  res.render('login')
});

//sign-up page
router.get('/users/', async (req, res) => {
  res.render('signup')
});

//logout page
router.get('/logout', async (req, res) => {
  //might want to ask user to confirm they would like to log out before rendering logout page
  res.render('logout')
});

module.exports = router