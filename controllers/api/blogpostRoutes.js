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

//update existing blog
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlog = await BlogPosts.update(
            {
                title: req.body.title, 
                content: req.body.content,
            },
            {
                where: {
                    user_id: req.session.user_id,
                    id: req.params.id,
                }
            }
        );
        res.status(200).json(createBlog)
        console.log(createBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete existing blog
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteBlog = await BlogPosts.destroy({
            where: {
                id: req.params.id,
                user_id: res.session.user_id,
            }
        });

        if (!deleteBlog) {
            alert(`You don't have permission to delete this post`)
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(deleteBlog)
        console.log(deleteBlog);
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
                            {
                                model: Users,
                            }
                        ]
                },
            ],
        });

        // const oneBlogPost = dbBlogData.map((reviews) =>
        //     reviews.get({ plain: true })
        // );

        const oneBlogPost = dbBlogData.get({ plain: true})
        console.log('----------oneBlogPost---------')
        console.log(oneBlogPost);
        const blogTitle = oneBlogPost.title;
        const blogContent = oneBlogPost.content;
        const blogDate = oneBlogPost.date;
        const blogUser = oneBlogPost.user.name;
        console.log(blogTitle);
        // const blogComments = oneBlogPost.comments.map((comments) =>
        // comments.get({ plain: true}));

        // console.log(oneBlogPost);
        const blogComments = oneBlogPost.comments
        // console.log(blogComments)

        
        console.log('---------comments-----------------')
        console.log(blogComments)

        const blogCommentsDisplay = blogComments.map((comments)=>
            comments);
        console.log('------------map-------')
        console.log(blogCommentsDisplay)

        res.render('oneBlogPost', {
            blogTitle,
            blogContent,
            blogDate,
            blogUser,
            blogCommentsDisplay, 
        })

        // res.status(200).json(oneBlogPost)

        // const comment = oneBlogPost.comments[0].comment
        // console.log(comment)
        // const commentUser = oneBlogPost.comments[0].user.name
        // console.log(commentUser)
        // res.status(200).json(blogCommentsDisplay)


        // if (oneBlogPost.length == 0) {
        //     const blog_id = req.params.id;

        //     res.render('noReviews', {
        //         blog_id,
        //         user_id: req.session.user_id,
        //         logged_in: req.session.logged_in
        //     })
        //     return;
        // }
        // else {
        //     const blogTitle = oneBlogPost[0].blogpost.title;
        //     const blogContent = oneBlogPost[0].blogpost.content;

        //     res.render('oneBlogPost', {
        //         oneBlogPost,
        //         blogTitle,
        //         blogContent,
        //         user_id: req.session.user_id,
        //         logged_in: req.session.logged_in
        //     })
        // }

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;