const { Comments, Users, BlogPosts } = require('../../models')
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const path = require('path');

//post a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const postComment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(postComment)
        console.log(postComment)
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;