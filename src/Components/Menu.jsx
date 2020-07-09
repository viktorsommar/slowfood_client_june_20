import React, { Component } from "react";
import axios from "axios";
class Menu extends Component {
  state = {
    menu: [],
  };
  componentDidMount = async () => {
    let menuData = await axios.get("/products");
    this.setState({ menu: menuData.data.products });
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
            <div id={`product-${product.id}`}>
              {`${product.name} ${product.description} ${product.price}`}
              <button id="button" onClick={this.addToOrder}>
                Add to order
                  </button>
            </div>
          );
        if (product.category === "main_courses")
          maincourses.push(
            <div id={`product-${product.id}`}>
              {`${product.name} ${product.description} ${product.price}`}
                  <button id="button" onClick={this.addToOrder}>
                Add to order
                  </button>


            </div>
          );
        if (product.category === "desserts")
          desserts.push(
            <div id={`product-${product.id}`}>
              {`${product.name} ${product.description} ${product.price}`}
              <button id="button" onClick={this.addToOrder}>
                Add to order
                  </button>
            </div>
          );
        if (product.category === "drinks")
          drinks.push(
            <div id={`product-${product.id}`}>
              {`${product.name} ${product.description} ${product.price}`}
              <button id="button" onClick={this.addToOrder}>
                Add to order
                  </button>
            </div>
          );
      });
    return (
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
    );
  }
}
export default Menu;