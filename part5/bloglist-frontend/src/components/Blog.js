import React, { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showVisible, setShowVisible] = useState(false)

  const hideWhenVisible = showVisible? 'none': ''
  const showWhenVisible = showVisible? '': 'none'

  let blogStyle
  if (!showVisible) {
    blogStyle = {
      border: 'solid 2px green',
      paddingTop: 10,
      width: '40%',
      marginBottom: 5
    }
  } else if (showVisible) {
    blogStyle = {
      border: 'solid 2px green',
      paddingTop: 10,
      width: '40%',
      marginBottom: 5
    }
  }

  const hideBtnStyle = {
    marginBottom: 18,
  }

  const changeVisibility = () => {
    setShowVisible(!showVisible)
  }

  return (
    <div>
      <div style={{ display: hideWhenVisible }}>
        <div  style={blogStyle}>
          {blog.title} {blog.author}
          <button className='show-btn' onClick={changeVisibility}>show</button>
        </div>

      </div>
      <div style={{ display: showWhenVisible }}>
        <div style={blogStyle} >
          <p className='blog-data'>
            <button className='hide-btn' style={hideBtnStyle} onClick={changeVisibility}>hide</button><br></br>
            {`Title: ${blog.title}`} <br></br>
            {`Author: ${blog.author}`} <br></br>
            {`Likes: ${blog.likes}`}
            <button className='likes-btn' onClick={() => updateLikes(blog)}>like</button><br></br>
            {`url: ${blog.url}`} <br></br>

            <button
              style={{ marginTop: 10 }}
              onClick={() => deleteBlog(blog)}
            >remove
            </button> <br></br>

          </p>
        </div>


      </div>
    </div>

  )
}



export default Blog