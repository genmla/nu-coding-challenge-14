const Users = require('./Users');
const BlogPosts = require('./BlogPosts');
const Comments = require('./Comments');

Users.hasMany(BlogPosts, {
    foreignKey: 'user_id', 
});
Users.hasMany(Comments, {
    foreignKey: 'user_id', 
});

BlogPosts.hasMany(Comments, {
    foreignKey: 'blogpost_id',
});
BlogPosts.belongsTo(Users, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
});
Comments.belongsTo(BlogPosts, {
    foreignKey: 'blogpost_id'
})

module.exports = { Users, BlogPosts, Comments };