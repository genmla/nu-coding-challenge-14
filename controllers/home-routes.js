const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage')
  });

  router.get('/dashboard', async (req, res) => {
    res.render('dashboard')
  });

  router.get('/login', async (req, res) => {
    res.render('login')
  });

  router.get('/logout', async (req, res) => {
    res.render('logout')
  });
  
  module.exports = router