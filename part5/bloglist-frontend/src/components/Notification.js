import React from 'react'

const Notification = ( { message } ) => {

  if (message !== '') {
    let colorSelect = message[1] ? 'red': 'green'
    return (
      <div id='blog-msg' style={{
        backgroundColor: 'lightgray',
        color: colorSelect,
        textAlign:'center',
        border: `solid 2px ${colorSelect}`
      }
      }>
        {message}
      </div>
    )
  } else {
    return (
      <div>
        {message}
      </div>
    )
  }

}


export default Notification