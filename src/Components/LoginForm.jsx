import React from 'react';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.authenticate} id='login-form'>
      <label>Email</label>
      <input name='email' type='email' id='email' />
      <label>Password</label>
      <input name='password' type='password' id='password' />
      <button id= 'submit'>Submit</button>
    </form>
  )
}

export default LoginForm