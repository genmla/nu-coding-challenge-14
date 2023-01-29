const { BlogPosts, Users, Comments } = require('../../models');
const path = require('path');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {

    try {
        const dbBlogData = await BlogPosts.findByPk(req.params.id, {
            include: [
                {
                    model: Users
                },
                {
                    model: Comments
                },
            ],
        });

        const oneBlogPost = dbBlogData.get({ plain: true});

        res.render('oneBlogPost', {
            oneBlogPost, 
            users_id: req.session.users_id,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;