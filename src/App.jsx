import React, { Component } from "react";
import Menu from "./Components/Menu";
import Login from "./Components/Login";

class App extends Component {
  state = {
    authenticated: false
  }

  render() {
    let login
    this.state.authenticated ? (
      login = (
        <p id="message">You are currently logged in as {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
      )
    ) : (
      login = (
        <Login 
          setAuthenticated={() => this.setState({authenticated: true})}
        />
      )
    )

    return (
      <>
      <div class="ui inverted vertial center aligned segment">
        <nav class="ui container">
        {login}
        </nav>
        </div>
        <div class="ui content container">
        <h1 class="ui inverted header">Slowfood</h1>
        <Menu 
          authenticated={this.state.authenticated}
        />
        </div>
      </>
      );
  };
}

export default App;