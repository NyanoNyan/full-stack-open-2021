import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login';
import CreateBlogs from './components/CreateBlogs';
import Notification from './components/Notification';

import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('loggin in with ', username, password);

    try {
      const user = await loginService.login({
        username,  password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setLoginMessage('wrong username or password')
      setTimeout(() => {
        setLoginMessage(loginMessage)
      }, 5000)
    }

  }

  const handleNewBlog = async (event) => {
    event.preventDefault();
    blogService.setToken(user.token);
    const newObj = {
      title: title,
      author: author,
      url: url 
    };
    const messageSetup = [`a new blog ${title} by ${author} added`, false];

    try {
      await blogService.create(newObj);
      setMessage(messageSetup);
      setTitle('');
      setAuthor('');
      setUrl('');
      setTimeout(() => {
        setMessage('')
      }, 5000);
    } catch (exception) {
      console.log('Error')
    }


  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
          <div style={{backgroundColor:'lightgray', textAlign:'center'}}>
            {loginMessage}
          </div>

         <Login 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>     
      <h2>blogs</h2>
      <Notification 
        message = {message}
      />
      <div>
        <p style={{display: 'inline-block'}}>{`${user.username} is logged in.`}</p>
        <button onClick={ () => {setUser(null), window.localStorage.removeItem('loggedBlogappUser')}}>logout</button>
      </div>

      <div>
        <CreateBlogs
          handleNewBlog={handleNewBlog}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </div>

      <div style={{marginTop: '10px'}}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>


    </div>
  )
}

export default App