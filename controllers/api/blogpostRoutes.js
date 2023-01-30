const { BlogPosts, Users, Comments } = require('../../models');
const path = require('path');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

//create a new blog
router.post('/', async (req, res) => {
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

//display all comments for select blog by blog id
router.get('/:id', async (req, res) => {

    try {
        const dbBlogData = await Comments.findAll({
            where: {
                blogpost_id: req.params.id
            },
            include: [
                {
                    model: BlogPosts
                },
                {
                    model: Users
                },
            ],
        });

        const oneBlogPost = dbBlogData.map((reviews) => 
            reviews.get({ plain: true})
        );
        
        console.log(oneBlogPost)

        if (oneBlogPost.length == 0) {
            const blog_id = req.params.id; 

            res.render('noReviews', {
                blog_id, 
                user_id: req.session.user_id, 
                logged_in: req.session.logged_in
            })
            return;
        }
        else {
            const blogTitle = oneBlogPost[0].blogpost.title;
            const blogContent = oneBlogPost[0].blogpost.content;
            
            res.render('oneBlogPost', {
                oneBlogPost,
                blogTitle,
                blogContent, 
                user_id: req.session.user_id,
                logged_in: req.session.logged_in
            })
        }
        
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;