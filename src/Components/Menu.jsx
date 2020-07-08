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
    let menuList;
    this.state.menu &&
      (menuList = this.state.menu.map((product) => {
        return (
          <div id={`product-${product.id}`}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        );
      }));
    return <div>{menuList}</div>;
  }
}

export default Menu;