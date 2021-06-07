import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlogs from './components/CreateBlogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState('')
  const [loginMessage, setLoginMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updated, setUpdated] = useState(false)

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with ', username, password)

    try {
      const user = await loginService.login({
        username,  password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setLoginMessage('wrong username or password')
      setTimeout(() => {
        setLoginMessage(loginMessage)
      }, 5000)
    }

  }

  const createBlog = async (newObj, msgSetup) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(newObj)
      setMessage(msgSetup)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      console.log('Error', exception)
    }
  }

  const updateLikes = async(blog) => {
    // console.log('hello', blog);
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url
    }
    try{
      await blogService.update(blog.id, updatedBlog)
      setUpdated(true)
      setTimeout(() => {
        setUpdated(false)
      }, 5000)

    } catch (error) {
      console.log('Error', error)
    }
  }

  const deleteBlog = async(blog) => {
    try {
      window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)
      await blogService.deleteBlog(blog.id)
      setUpdated(true)
      setMessage([`${blog.title} has been deleted`, true])
      setTimeout(() => {
        setUpdated(false)
        setMessage('')
      }, 5000)
    } catch (error) {
      console.log('Error', error)
      setMessage([`${blog.title} cannot be deleted`, true])
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }


  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sortBlogs(blogs)
      setBlogs(sortedBlogs)
    })


  }, [message, updated])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
        <div id="login-msg" style={{ backgroundColor:'lightgray', textAlign:'center' }}>
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
        <p style={{ display: 'inline-block' }}>{`${user.username} is logged in.`}</p>
        <button onClick={ () => {setUser(null), window.localStorage.removeItem('loggedBlogappUser')}}>logout</button>
      </div>

      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlogs
            createBlog={createBlog}
          />
        </Togglable>
      </div>

      <div style={{ marginTop: '10px' }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>
        )}
      </div>


    </div>
  )
}

export default App