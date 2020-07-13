import React, { Component } from "react";
import axios from "axios";
import { Button, Container } from 'semantic-ui-react'

class Menu extends Component {
  state = {
    menu: [],
    orderMessage: {},
    orderDetails: {},
    orderId: null,
    showOrder: false,
    orderTotal: "",
  };
  componentDidMount = async () => {
    let menuData = await axios.get("/products");
    this.setState({ menu: menuData.data.products });
  };

  finalizeOrder = async () => {
    let credentials = await JSON.parse(sessionStorage.getItem("credentials"))
    let headers = {
      ...credentials,
      "Content-type": "application/json",
      Accept: "application/json"
    }

    let response = await axios.put(`/orders/${this.state.orderDetails.id}`, { 
      activity: 'finalize' 
    }, {
      headers: headers
    })

    this.setState({ 
      orderMessage: { id: 0, message: response.data.message }, 
      orderDetails:{}, 
      showOrder: false})
  }

  addToOrder = async (event) => {
    let productId = event.target.parentElement.dataset.id;
    let credentials = await JSON.parse(sessionStorage.getItem("credentials"));
    let headers = {
      ...credentials,
      "Content-type": "application/json",
      Accept: "application/json",
    };

    let response;
    if (this.state.orderDetails.hasOwnProperty("id") && this.state.orderDetails.finalized === false) {
      response = await axios.put(
        `/orders/${this.state.orderDetails.id}`,
        {
          product_id: productId,
        },
        {
          headers: headers,
        }
      );
    } else {
      response = await axios.post(
        "/orders",
        {
          product_id: productId,
        },
        {
          headers: headers,
        }
      );
    }

    this.setState({
      orderMessage: {
        message: response.data.message,
        id: productId,
      },
      orderDetails: response.data.order,
    });
  };

  render() {
    let starters = [];
    let maincourses = [];
    let desserts = [];
    let drinks = [];
    let orderDetailsDisplay
    this.state.menu &&
      this.state.menu.forEach((product) => {
        if (product.category === "starters")
          starters.push(
            <div
              key={product.id}
              id={`product-${product.id}`}
              data-id={product.id}
              data-price={product.price}
            >
              {`${product.name} ${product.description} ${product.price}`}
              <br></br>
              {this.props.authenticated && (
                <Button id="button" onClick={this.addToOrder}>
                  Add to order
                </Button>
              )}

              {parseInt(this.state.orderMessage.id) === product.id && (
                <p id="order-message">{this.state.orderMessage.message}</p>
              )}
            </div>
          );
        if (product.category === "main_courses")
          maincourses.push(
            <div
              key={product.id}
              id={`product-${product.id}`}
              data-id={product.id}
              data-price={product.price}
            >
              {`${product.name} ${product.description} ${product.price}`}
              {this.props.authenticated && (
                <Button id="button" onClick={this.addToOrder}>
                  Add to order
                </Button>
              )}
              {parseInt(this.state.orderMessage.id) === product.id && (
                <p id="order-message">{this.state.orderMessage.message}</p>
              )}
            </div>
          );
        if (product.category === "desserts")
          desserts.push(
            <div
              key={product.id}
              id={`product-${product.id}`}
              data-id={product.id}
              data-price={product.price}
            >
              {`${product.name} ${product.description} ${product.price}`}
              {this.props.authenticated && (
                <Button id="button" onClick={this.addToOrder}>
                  Add to order
                </Button>
              )}
              {parseInt(this.state.orderMessage.id) === product.id && (
                <p id="order-message">{this.state.orderMessage.message}</p>
              )}
            </div>
          );

        if (product.category === "drinks")
          drinks.push(
            <div
              key={product.id}
              id={`product-${product.id}`}
              data-id={product.id}
              data-price={product.price}
            >
              {`${product.name} ${product.description} ${product.price}`}
              {this.props.authenticated && (
                <Button id="button" onClick={this.addToOrder}>
                  Add to order
                </Button>
              )}
              {parseInt(this.state.orderMessage.id) === product.id && (
                <p id="order-message">{this.state.orderMessage.message}</p>
              )}
            </div>
          );

          if (this.state.orderDetails.hasOwnProperty("products")) {
            orderDetailsDisplay = this.state.orderDetails.products.map((item) => {
              return <li key={item.name}>{`${item.name} x ${item.amount}`}</li>;
          });
        } else {
          orderDetailsDisplay = "Nothing to see";
        }
      })

    return (
      <>
      <div>
        <Container textAlign="center">
      {this.state.orderMessage.id === 0 && (
        <p id="confirmation-message">{this.state.orderMessage.message}</p>
      )}
        {this.state.orderDetails.hasOwnProperty("products") && (
          <Button
            onClick={() => this.setState({ showOrder: !this.state.showOrder })}
          >
            View order
          </Button>
        )}
        {this.state.showOrder &&
        <>
          <ul id="order-details">{orderDetailsDisplay}</ul>
          <p>To pay: {this.state.orderDetails.order_total || this.state.orderTotal}{" "}kr</p>
          <Button id="confirm-order" onClick={this.finalizeOrder.bind(this)}>Confirm!</Button>
        </>
        }
        <div>
          <div id="starters">
            <h3>Starters</h3>
            {starters}
          </div>
          <div id="main_courses">
            <h3>Maincourses</h3>
            {maincourses}
          </div>
          <div id="desserts">
            <h3>Desserts</h3>
            {desserts}
          </div>
          <div id="drinks">
            <h3>Drinks</h3>
            {drinks}
          </div>
        </div>
        </Container>
        </div>
      </>
    );
  }
}
export default Menu;
