import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogs = ( { createBlog } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newObj = {
      title: title,
      author: author,
      url: url
    }
    const msgSetup = [`a new blog ${title} by ${author} added`, false]

    createBlog(newObj, msgSetup)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div>
      <h2>create new</h2>

      <form id="form-blog" onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            id="title-inp"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            id="author-inp"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            id="url-inp"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button id="create-submit" type="submit">create</button>
      </form>

    </div>
  )
}

CreateBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogs