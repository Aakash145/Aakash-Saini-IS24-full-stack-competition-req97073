import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { withRouter } from '../common/with-router';


//For Updating/Deleting a Product
class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductOwnerName = this.onChangeProductOwnerName.bind(this);
    this.onChangeDevelopers = this.onChangeDevelopers.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeScrumMasterName = this.onChangeScrumMasterName.bind(this);
    this.onChangeMethodology = this.onChangeMethodology.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        productId: null,
        productName:"",
        productOwnerName: "",
        developers: [],
        startDate: null,
        scrumMasterName: "",
        methodology: "",
      },
      errors: {},
      message: ""
    };
}

componentDidMount() {
  this.getProduct(this.props.router.params.id);
}

onChangeProductName(e) {
  const productName = e.target.value;

  this.setState(function(prevState) {
    return {
      currentProduct: {
        ...prevState.currentProduct,
        productName: productName
      }
    };
  });
}
onChangeProductOwnerName(e) {
    const productOwnerName = e.target.value;
  
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          productOwnerName: productOwnerName
        }
      };
    });
  }
  onChangeDevelopers(e) {
    const developers = e.target.value;
  
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          developers: developers
        }
      };
    });
  }
  onChangeStartDate(e) {
    const startDate = e.target.value;
  
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          startDate: startDate
        }
      };
    });
  }
  onChangeScrumMasterName(e) {
    const scrumMasterName = e.target.value;
  
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          scrumMasterName: scrumMasterName
        }
      };
    });
  }
  onChangeMethodology(e) {
    const methodology = e.target.value;
  
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          methodology: methodology
        }
      };
    });
  }

  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.currentProduct.productName) {
      formIsValid = false;
      errors["productName"] = "*Please enter the Product Name.";
    }

    if (!this.state.currentProduct.productOwnerName) {
      formIsValid = false;
      errors["productOwnerName"] = "*Please enter the Product Owner Name.";
    }

    if (!this.state.currentProduct.developers) {
      formIsValid = false;
      errors["developers"] = "*Please enter the Developer's names based on the requirement.";
    }

    if (!this.state.currentProduct.scrumMasterName) {
      formIsValid = false;
      errors["scrumMasterName"] = "*Please enter the Scrum Master Name.";
    }

    if (!this.state.currentProduct.startDate) {
      formIsValid = false;
      errors["startDate"] = "*Please enter the Start Date.";
    }

    if (!this.state.currentProduct.methodology) {
      formIsValid = false;
      errors["methodology"] = "*Please enter the Methodology.";
    }

    this.setState({
      errors: errors
    })
    return formIsValid
}


  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
            currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduct() {
    if (this.validateForm()) {
    ProductDataService.update(
      this.state.currentProduct.productId,
      this.state.currentProduct
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.productId)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/products');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={currentProduct.productName}
                  onChange={this.onChangeProductName}
                />
                <div className="errorMsg">{this.state.errors.productName}</div>

              </div>
              <div className="form-group">
                <label htmlFor="productOwnerName">Product Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productOwnerName"
                  value={currentProduct.productOwnerName}
                  onChange={this.onChangeProductOwnerName}
                />
                <div className="errorMsg">{this.state.errors.productOwnerName}</div>

              </div>
              <div className="form-group">
                <label htmlFor="developers">Developers</label>
                <input
                  type="text"
                  className="form-control"
                  id="developers"
                  value={currentProduct.developers}
                  onChange={this.onChangeDevelopers}
                />
                <div className="errorMsg">{this.state.errors.developers}</div>

              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={currentProduct.startDate}
                  onChange={this.onChangeStartDate}
                />
                <div className="errorMsg">{this.state.errors.startDate}</div>

              </div>
              <div className="form-group">
                <label htmlFor="scrumMaster">Scrum Master</label>
                <input
                  type="text"
                  className="form-control"
                  id="scrumMaster"
                  value={currentProduct.scrumMasterName}
                  onChange={this.onChangeScrumMasterName}
                />
                <div className="errorMsg">{this.state.errors.scrumMasterName}</div>
              </div>
              <div className="form-group">
                <label htmlFor="methodology">Methodology</label>
                <input
                  type="text"
                  className="form-control"
                  id="methodology"
                  value={currentProduct.methodology}
                  onChange={this.onChangeMethodology}
                />
              <div className="errorMsg">{this.state.errors.methodology}</div>
              </div>
            </form>
            <button
              onClick={this.deleteProduct}>
              Delete
            </button>
            <button
              type="submit"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
          )}
      </div>
    );
  }
}

export default withRouter(Product);

