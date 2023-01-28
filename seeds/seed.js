const sequelize = require('../config/connection');
const { Users, BlogPosts, Comments } = require('../models');

const usersData = require('./users-seeds.json');
const blogpostsData = require ('./blogposts-seeds.json');
const commentsData = require('./comments-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await Users.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    await BlogPosts.bulkCreate(blogpostsData, {
        individualHooks: true,
        returning: true,
    });

    await Comments.bulkCreate(commentsData, {
        individualHooks: true,
        returning: true,
    });
}

seedDatabase();