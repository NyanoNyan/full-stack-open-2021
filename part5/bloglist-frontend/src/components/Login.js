import React from 'react'

const Login = ( { handleLogin, username, setUsername, password, setPassword } ) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div id="username-input">
          <label>username:</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div id="password-input">
          <label>password:</label>
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}


export default Login