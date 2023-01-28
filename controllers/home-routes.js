const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
  res.render('homepage')
});

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