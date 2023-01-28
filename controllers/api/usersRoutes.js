const router = require('express').Router();
const path = require('path');
const { Users, BlogPosts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//sign-up by creating new user
router.post('/', async (req, res) => {

    try {
        const dbUserData = await Users.create(req.body);

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            res.session.logged_in = true;

            res.status(200).json(dbUserData);
        })
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
        res.status(500).json(err);
    }
});

//login for existing users by finding user name
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await Users.findOne({
            where: {
                name: req.body.name
            }
        })
        if (!dbUserData) {
            alert('Username not found, please try again');
            res.status(400).json({ message: 'Username not found.'});
            return;
        }
        
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            alert('Incorrect password, please try again');
            res.status(400).json({ message: 'Incorect password.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            res.session.logged_in = true;

            res.json({ user: dbUserData, message: 'Logging in'});
        });

        // res.render('homepage') 

    } catch (err) {
        res.status(400).json(err);
    }
});

//logout logged in users by destroying session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;