const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/users');

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})
  
blogRouter.post('/', async(request, response) => {
  const body = request.body;
  
  const user = await User.findById(body.userId);
  // Random user
  // const getUsers = await User.find({});
  // const randItem  = getUsers[Math.floor(Math.random() * getUsers.length)];
  // const user = randItem;

  if (!body.title && !body.url) {
    return response.status(400).end();
  };

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog)
})

blogRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end()
})
  
blogRouter.put('/:id', async(request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true})
  response.json(updatedNote);

})


module.exports = blogRouter;