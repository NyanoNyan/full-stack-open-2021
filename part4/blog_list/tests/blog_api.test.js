const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const bcrypt = require('bcrypt');
const User = require('../models/users');

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

  });

  test('missing title and url', async () => {
    const newBlog = {
      author: 'Yugi',
      likes: 99,
    };

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

});

describe('testing update, delete', () => {
  test('delete note', async () => {
    const selectedBlog = await Blog.find({title: 'This is going to be the one'});

    const blogToDelete = selectedBlog[0].id
    console.log(blogToDelete)
    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .expect(204)

    const updatedNotes = await helper.getAllBlogsInDB();
    expect(updatedNotes).toHaveLength(helper.initialBlogs.length - 1);

    const contents = updatedNotes.map(x => x.title);
    expect(contents).not.toContain(blogToDelete.title)

  });

  test('update note', async () => {
    const selectedBlog = await Blog.find({title: 'How are you doing?'});
    const blogToUpdateId = selectedBlog[0].id;

    const updateBlog = {
      title: 'How are you doing?',
      author: "Paul",
      url: "gg.com",
      likes: 60
    }

    await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(updateBlog)
      .expect(200)

    const newBlogCheck = await Blog.find({title: 'How are you doing?'});
    expect(newBlogCheck[0].likes).toBe(60)

  });

});

describe('One user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('testing', 10);
    const user = new User({ username: 'nyan', passwordHash});
    const user2 = new User({ username: 'Draco', name: 'Draco Will', passwordHash});

    await user.save();
    await user2.save();
  })

  test('create a new username', async () => {
    const usersAtStart = await helper.getUsersInDB();

    const newUser = {
      username: 'Draco',
      name: 'Jacob Will',
      password: 'testing2', 
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    
    const usersEnd = await helper.getUsersInDB();
    expect(usersEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  });

  test('Invalid users', async () => {
    const usersAtStart = await helper.getUsersInDB();

    const newUser = {
      username: 'D',
      name: 'Jacob',
      password: 'testing2', 
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.getUsersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

  })

  test('user already in database', async () => {
    const usersAtStart = await helper.getUsersInDB();
    console.log(usersAtStart)
    const newUser = {
      username: 'Draco',
      name: 'Jacob Will',
      password: 'testing2', 
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.getUsersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

  });

});




afterAll(() => {
    mongoose.connection.close();
})