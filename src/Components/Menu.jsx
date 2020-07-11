import React, { Component } from "react";
import axios from "axios";

class Menu extends Component {
  state = {
    menu: [],
    orderMessage: {},
    orderDetails: {},
    orderId: null,
    showOrder: false,
  };
  componentDidMount = async () => {
    let menuData = await axios.get("/products");
    this.setState({ menu: menuData.data.products });
  };

  addToOrder = async (event) => {
    let productId = event.target.parentElement.dataset.id;
    let credentials = await JSON.parse(sessionStorage.getItem("credentials"));
    let headers = {
      ...credentials,
      "Content-type": "application/json",
      Accept: "application/json",
    };

    let response;
    if (this.state.orderDetails.hasOwnProperty("id")) {
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
              {this.props.authenticated && (
                <button id="button" onClick={this.addToOrder}>
                  Add to order
                </button>
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
                <button id="button" onClick={this.addToOrder}>
                  Add to order
                </button>
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
                <button id="button" onClick={this.addToOrder}>
                  Add to order
                </button>
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
                <button id="button" onClick={this.addToOrder}>
                  Add to order
                </button>
              )}
              {parseInt(this.state.orderMessage.id) === product.id && (
                <p id="order-message">{this.state.orderMessage.message}</p>
              )}
            </div>
          );
      });

    return (
      <>
        {this.state.orderId !== "" && (
          <button
            onClick={() => {
              this.setState({ showOrder: true });
            }}
          >
            View order
          </button>
        )}
        {this.state.showOrder && (
          <ul id="order-details">
            <li>item 1</li>
            <li>Item 2</li>
          </ul>
        )}
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
      </>
    );
  }
}
export default Menu;
