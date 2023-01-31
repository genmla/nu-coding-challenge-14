const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {

  try {
    const dbBlogData = await BlogPosts.findAll({
      order: [
        ['date', 'DESC']
      ],
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
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(400).json(err);
  }
})

//dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userBlogs = await BlogPosts.findAll({
      where: {
        user_id: req.session.user_id
      },
      order: [
        ['date', 'DESC']
      ],
      include: [
        {
          model: Users
        },
        {
          model: Comments
        },
      ],
    });

    const userBlogsDisplay = userBlogs.map((blogs) =>
      blogs.get({ plain: true })
    );

    console.log(userBlogs);
    console.log(userBlogsDisplay);

    res.render('dashboard', {
      userBlogsDisplay,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

//create new blog page
router.get('/create', withAuth, async (req, res) => {
  res.render('createBlog', {
    user_id: req.session.user_id,
    logged_in: req.session.logged_in
  })
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