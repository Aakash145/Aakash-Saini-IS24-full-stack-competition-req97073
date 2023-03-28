const filename = '../data/posts.json'
let products = require(filename)
const helper = require('../helpers/helper.js')


//Get All Products
function getProducts() {
    return new Promise((resolve, reject) => {
        if (products.length === 0) {
            reject({
                message: 'No Products are available',
                status: 202
            })
        }
        resolve(products)
    })

}

//Get Product By ID
function getProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(products => resolve(products))
        .catch(err => reject(err))
    })
}

//Get Developer Details
function getDevelopers(developer) {
    return new Promise((resolve, reject) => {
        helper.mustBeInDeveloperArray(products, developer)
        .then(products => resolve(products))
        .catch(err => reject(err))
    })
}

//Get ScrumMaster Details
function getScrumMaster(scrumMaster) {
    return new Promise((resolve, reject) => {
        helper.mustBeInScrumArray(products, scrumMaster)
        .then(products => resolve(products))
        .catch(err => reject(err))
    })
}

//Insert Product
function insertProduct(newProduct) {
    return new Promise((resolve, reject) => {
        const id = { productId: helper.getNewId(products) }
        newProduct = { ...id, ...newProduct}
        products.push(newProduct)
        helper.writeJSONFile(filename, products)
        resolve(newProduct)
    })
}

//Update Product
function updateProduct(id, newProduct) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(product => {
            const index = products.findIndex(p => p.productId == product.productId)
            id = { productId: product.productId } 
            products[index] = { ...id, ...newProduct}
            helper.writeJSONFile(filename, products)
            resolve(products[index])
        })
        .catch(err => reject(err))
    })
}

//Delete Product by ID
function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(() => {
            products = products.filter(p => p.productId != id)
            helper.writeJSONFile(filename, products)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertProduct,
    getProducts,
    getProduct, 
    updateProduct,
    deleteProduct,
    getDevelopers,
    getScrumMaster
}