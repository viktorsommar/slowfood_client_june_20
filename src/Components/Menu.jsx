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
        if (product.category === "Starters")
        return (
          <div id={`product-${product.id}`}>
            <h3>Starters</h3>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          );
          if (product.category === "Main Courses")
          return(
            <div id={`product-${product.id}`}>
              <h3>Main Courses</h3>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          );
          if (product.category === "Deserts")
          return(
            <div id={`product-${product.id}`}>
              <h3>Deserts</h3>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          );
      }));
    return <div>{menuList}</div>;
  }
}

export default Menu;