const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray);
})

describe('Testing apis', () => {

  test('notes are returned as json, check for get', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('check blog amount', async() => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('check unique id for blog', async() => {
    const response = await api.get('/api/blogs');
    const blogList = response.body;
    blogList.map(blog => expect(blog.id).toBeDefined());

  });

  test('add another blog', async() => {
    const newBlog = {
      title: 'This is going to be lit',
      author: 'Jame',
      url: 'sdfs@asdfs.com',
      likes: 55,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    
    const allBlogs = await helper.getAllBlogsInDB();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const checkContent = allBlogs.map(blog => blog.title)
    expect(checkContent).toContain(
      'This is going to be lit'
    )

  });

  test('default likes', async() => {
    const newBlog = {
      title: 'Time to duel',
      author: 'Yugi',
      url: 'duel@duel.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const selectedBlog = await Blog.find({title: 'Time to duel'})
    expect(selectedBlog[0].likes).toBe(0);

  })
});

afterAll(() => {
    mongoose.connection.close();
})