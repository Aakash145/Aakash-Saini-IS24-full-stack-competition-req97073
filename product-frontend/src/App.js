import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductList from "./components/products-list.component";

class App extends Component {
  render() {
    return(
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} onClick={() => {window.location.href="/products"}}  className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} onClick={() => {window.location.href="/add"}} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ProductList/>} />
            <Route path="/products" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/products/:id" element={<Product/>} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;