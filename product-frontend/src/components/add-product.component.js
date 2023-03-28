import React, { Component } from "react";
import ProductDataService from "../services/product.service";


//For Adding a Product
export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductOwnerName = this.onChangeProductOwnerName.bind(this);
    this.onChangeDevelopers = this.onChangeDevelopers.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeScrumMasterName = this.onChangeScrumMasterName.bind(this);
    this.onChangeMethodology = this.onChangeMethodology.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      productId: null,
      productName:"",
      productOwnerName: "",
      developers: [],
      startDate: null,
      scrumMasterName: "",
      methodology: "",
      submitted: false,
      errors: {}
    };
  }

  onChangeProductName(e) {
    this.setState({
        productName: e.target.value
    });
  }

  onChangeProductOwnerName(e) {
    this.setState({
        productOwnerName: e.target.value
    });
  }

  onChangeDevelopers(e) {
    this.setState({
        developers: e.target.value
    });
  }

  onChangeStartDate(e) {
    this.setState({
        startDate: e.target.value
    });
  }

  onChangeScrumMasterName(e) {
    this.setState({
        scrumMasterName: e.target.value
    });
  }

  onChangeMethodology(e) {
    this.setState({
        methodology: e.target.value
    });
  }

  validateForm() {
      let errors = {};
      let formIsValid = true;

      if (!this.state.productName) {
        formIsValid = false;
        errors["productName"] = "*Please enter the Product Name.";
      }

      if (!this.state.productOwnerName) {
        formIsValid = false;
        errors["productOwnerName"] = "*Please enter the Product Owner Name.";
      }

      var tokens = this.state.developers.split(",")

      if (!this.state.developers ||  tokens.length > 5) {
        formIsValid = false;
        errors["developers"] = "*Please enter the Developer's names based on the requirement.";
      }

      if (!this.state.scrumMasterName) {
        formIsValid = false;
        errors["scrumMasterName"] = "*Please enter the Scrum Master Name.";
      }

      if (!this.state.startDate) {
        formIsValid = false;
        errors["startDate"] = "*Please enter the Start Date.";
      }

      if (!this.state.methodology) {
        formIsValid = false;
        errors["methodology"] = "*Please enter the Methodology.";
      }

      this.setState({
        errors: errors
      })
      return formIsValid
  }

  saveProduct() {
    if (this.validateForm()) {
    var data = {
      productName: this.state.productName.trim(),
      productOwnerName: this.state.productOwnerName.trim(),
      developers: this.state.developers,
      startDate: this.state.startDate,
      scrumMasterName: this.state.scrumMasterName.trim(),
      methodology: this.state.methodology.trim()
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          productId: response.data.productId,
          productName: response.data.productName,
          productOwnerName: response.data.productOwnerName,
          developers: response.data.developers,
          startDate: response.data.startDate,
          scrumMasterName: response.data.scrumMasterName,
          methodology: response.data.methodology,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  newProduct() {
    this.setState({
      prodctId: null,
      productName: "",
      productOwnerName: "",
      developers: [],
      startDate: null,
      scrumMasterName: "",
      methodology: "",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProduct}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                required
                value={this.state.productName}
                onChange={this.onChangeProductName}
                name="productName"
              />
              <div className="errorMsg">{this.state.errors.productName}</div>
            </div>

            <div className="form-group">
              <label htmlFor="productOwnerName">Product Owner Name</label>
              <input
                type="text"
                className="form-control"
                id="productOwnerName"
                value={this.state.productOwnerName}
                onChange={this.onChangeProductOwnerName}
                name="productOwnerName"
              />
              <div className="errorMsg">{this.state.errors.productOwnerName}</div>
            </div>

            <div className="form-group">
              <label htmlFor="developers">Developers</label><small>(You can add upto 5 Developers and seperate them by ,)</small>
              <input
                type="text"
                className="form-control"
                id="developers"
                required
                value={this.state.developers}
                onChange={this.onChangeDevelopers}
                name="developers"
              />
              <div className="errorMsg">{this.state.errors.developers}</div>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                required
                value={this.state.startDate}
                onChange={this.onChangeStartDate}
                name="startDate"
              />
              <div className="errorMsg">{this.state.errors.startDate}</div>
            </div>

            <div className="form-group">
              <label htmlFor="scrumMaster">Scrum Master</label>
              <input
                type="text"
                className="form-control"
                id="scrumMaster"
                required
                value={this.state.scrumMasterName}
                onChange={this.onChangeScrumMasterName}
                name="scrumMaster"
              />
              <div className="errorMsg">{this.state.errors.scrumMasterName}</div>
            </div>

            <div className="form-group">
              <label htmlFor="methodology">Methodology</label>
              <input
                type="text"
                className="form-control"
                id="methodology"
                required
                value={this.state.methodology}
                onChange={this.onChangeMethodology}
                name="methodology"
              />
            <div className="errorMsg">{this.state.errors.methodology}</div>
            </div>
            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}