const Blog = require('../models/blog');

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

module.exports = {
    initialBlogs
}