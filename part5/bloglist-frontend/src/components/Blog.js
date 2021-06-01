import React, { useState } from 'react'
const Blog = ({blog, updateLikes, key}) => {
  const [showVisible, setShowVisible] = useState(false);

  const hideWhenVisible = showVisible? 'none': '';
  const showWhenVisible = showVisible? '': 'none';
  console.log(hideWhenVisible)
  let blogStyle;
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

  console.log(blogStyle)

  const changeVisibility = () => {
    setShowVisible(!showVisible);
  }
  
  return (
    <div>
        <div style={{display: hideWhenVisible}}>
          <div  style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={changeVisibility}>show</button>
          </div>

      </div>  
      <div style={{display: showWhenVisible}}>
        <div style={blogStyle} >
          <p>
            {`Title: ${blog.title}`} <br></br>
            {`Author: ${blog.author}`} <br></br>
            {`Likes: ${blog.likes}`} 
            <button onClick={() => updateLikes(blog)}>like</button><br></br>
            {`url: ${blog.url}`} <br></br>
          </p>
          <button onClick={changeVisibility}>hide</button>
        </div>


      </div>
    </div>

  )
}



export default Blog