const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
});

  
blogRouter.post('/', middleware.userExtractor, async(request, response) => {
  const body = request.body;
  const user = request.user;

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

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id);

  if (user.blogs.find(id => id.toString() === request.params.id)){
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end()
  } else (
    response.status(400).json({
      error: 'User not authorized'
    }
    )
  )

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