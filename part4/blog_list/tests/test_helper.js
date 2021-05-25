const Blog = require('../models/blog');
const User = require('../models/users');

const initialBlogs = [
    {
        title: 'How are you doing?',
        author: "Paul",
        url: "gg.com",
        likes: 24
    },
    {
        title: 'This is going to be the one',
        author: "Jacob",
        url: "lol.com",
        likes: 50
    }
    
];

// const initialUsers= [
//     {
//         blogs: [],
//         username: "Paul",
//         name: "Paul Jacobs",
//     },
//     {
        
//     }
// ]

const getAllBlogsInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const getUsersInDB = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    initialBlogs,
    getAllBlogsInDB,
    getUsersInDB
}