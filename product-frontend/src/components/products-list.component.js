import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

//For Loading All Product List Based on Search Criteria
export default class ProductsList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.retrieveProducts = this.retrieveProducts.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.searchTitle = this.searchTitle.bind(this);
      this.onChangeValue = this.onChangeValue.bind(this);
  
      this.state = {
        products: [],
        searchTitle: "",
        searchType: ""
      };
    }
  
    componentDidMount() {
      this.retrieveProducts();
    }

    onChangeValue(e) {
      this.setState({
        searchType: e.target.value
      })
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle
        });
      }
    
      retrieveProducts() {
        ProductDataService.getAll()
          .then(response => {
            this.setState({
              products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      refreshList() {
        this.retrieveProducts();
      }
    
      //By search title
      searchTitle() {
        if(this.state.searchType === "developers"){
          ProductDataService.findByDeveloper(this.state.searchTitle)
          .then(response => {
            this.setState({
              products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }else if(this.state.searchType === "scrumMaster"){
          ProductDataService.findByScrumMaster(this.state.searchTitle)
          .then(response => {
            this.setState({
              products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }

      }
    
      render() {
        const { searchTitle, products } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
             &nbsp;&nbsp;
            <div onChange={this.onChangeValue}>
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="developers" id="developers" />
            <label class="form-check-label" for="developers">
              Developers
            </label>
            &nbsp;&nbsp;
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="scrumMaster" id="scrumMaster" />
            <label class="form-check-label" for="scrumMaster" >
              Scrum Master
            </label>
            &nbsp;&nbsp;
          </div>
            <div className="input-group-append">
              <button
              className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>
        </div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Product Number</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Owner Name</th>
      <th scope="col">Developers</th>
      <th scope="col">Start Date</th>
      <th scope="col">Scrum Master</th>
      <th scope="col">Methodology</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
                <tr>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productOwnerName}</td>
                  <td>{product.developers}</td>
                  <td>{product.startDate}</td>
                  <td>{product.scrumMasterName}</td>
                  <td>{product.methodology}</td>
                  <td><Link className="btn btn-secondary"
                  to={"/products/" + product.productId}>
                  Edit
              </Link></td>
                </tr>     
              ))}
  </tbody>
</table>
      </div>
    );
  }
}