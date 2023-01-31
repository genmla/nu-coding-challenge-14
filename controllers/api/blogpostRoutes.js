const { BlogPosts, Users, Comments } = require('../../models');
const path = require('path');
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { on } = require('events');

//create a new blog
router.post('/', withAuth, async (req, res) => {
    try {
        const createBlog = await BlogPosts.create({
            ...req.body,
            //pulls user_id from current session
            user_id: req.session.user_id
        });
        res.status(200).json(createBlog)
        console.log(createBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete existing blog
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteBlog = await BlogPosts.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!deleteBlog) {
            alert(`You don't have permission to delete this post`)
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(deleteBlog)
    } catch (err) {
        res.status(500).json(err);
    }
});

//display one blog by blog id
router.get('/:id', async (req, res) => {

    try {
        const dbBlogData = await BlogPosts.findByPk(req.params.id, {
            include: [
                {
                    model: Users
                },
                {
                    model: Comments,
                    include: [
                        //include users model for comments to get commenter user name
                        {
                            model: Users,
                        }
                    ]
                },
            ],
        });

        const oneBlogPost = dbBlogData.get({ plain: true })

        //capture variables to pass to hb temp (could write in temp as well)
        const blogTitle = oneBlogPost.title;
        const blogId = oneBlogPost.id;
        const blogContent = oneBlogPost.content;
        const blogDate = oneBlogPost.date;
        const blogUser = oneBlogPost.user.name;
        const blogUserId = oneBlogPost.user.id;

        //capture array to map comments associated with blog
        const blogComments = oneBlogPost.comments

        //map over comments array to display #each in hb template for blog post
        const blogCommentsDisplay = blogComments.map((comments) =>
            comments);

        res.render('oneBlogPost', {
            blogTitle,
            blogId,
            blogContent,
            blogDate,
            blogUser,
            blogUserId,
            blogCommentsDisplay,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;