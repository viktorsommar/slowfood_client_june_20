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
    let starters = []
    let mainCourses = []
    let deserts = []
    this.state.menu &&
      (this.state.menu.forEach((product) => {
        if (product.category === "Starters")
          starters.push(
            <div id={`product-${product.id}`}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          );
        if (product.category === "Main Courses")
          mainCourses.push(
            <div id={`product-${product.id}`}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          );
        if (product.category === "Deserts")
          deserts.push(
            <div id={`product-${product.id}`}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          );
      }));
    return (
      <div>
        <div id="starters">
          <h3>Starters</h3>
          {starters}
        </div>
        <div id="main-courses">
          <h3>Main Courses</h3>
          {mainCourses}
        </div>
        <div id="deserts">
          <h3>Deserts</h3>
          {deserts}
        </div>
      </div>
    )
  }
}
export default Menu;