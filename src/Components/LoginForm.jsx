import React from 'react';
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  return (
    <Form onSubmit={props.authenticate} id='login-form'>
      <Form.Field>
      <label id="label">Email</label>
      <input name='email' type='email' id='email' />
      </Form.Field>

      <Form.Field>
      <label id="label">Password</label>
      <input name='password' type='password' id='password' />
      <Button id='submit'>Submit</Button>
      </Form.Field>
    </Form>
  )
}

export default LoginForm