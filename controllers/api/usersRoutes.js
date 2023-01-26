const router = require('express').Router();
const path = require('path');
const { Users, BlogPosts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//sign-up

router.post('/', async (req, res) => {

    try {
        const dbUserData = await Users.create(req.body);

        req.session.save(() => {
            req.session.user_id = dbUserData.isSoftDeleted;
            res.session.logged_in = true;

            res.status(200).json(dbUserData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;