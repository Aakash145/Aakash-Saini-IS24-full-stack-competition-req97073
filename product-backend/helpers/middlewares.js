//Check if ID is an integer
function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

//Check if all fields are valid
function checkFieldsPost(req, res, next) {
    const { productName, productOwnerName, developers, scrumMasterName, methodology } = req.body
    if (productName && productOwnerName && developers && scrumMasterName && methodology) {
        next()
    } else {
        res.status(400).json({ message: 'The fields are not good' })
    }
}
module.exports = {
    mustBeInteger,
    checkFieldsPost
}