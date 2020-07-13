import React, { Component } from 'react';
import axios from 'axios';
import { storeAuthCredentials } from "../modules/auth"
import LoginForm from "./LoginForm"
import { Button } from "semantic-ui-react"

class Login extends Component {
  state = {
    renderForm: false
  }

  authenticate = async (event) => {
    event.preventDefault()
    try {
      let response = await axios.post("/auth", {
        email: event.target.email.value,
        password: event.target.password.value

      })

      await storeAuthCredentials(response)
      this.props.setAuthenticated()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let button
    let form

    this.state.renderForm ? (
      form = <LoginForm authenticate={this.authenticate} />
    ) : (
        button = <Button id="login" onClick={() => this.setState({ renderForm: true })}>Login</Button>
      )

    return (
      <div>
        {button}
        {form}
      </div>
    )
  }
}

export default Login;