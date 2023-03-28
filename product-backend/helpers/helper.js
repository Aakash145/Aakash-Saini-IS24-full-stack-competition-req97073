const fs = require('fs')

//New ID Generator
const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].productId + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

//Check if Product is present using id
function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.productId == id)
        if (!row) {
            reject({
                message: 'Cannot find a Project with ID: ' + id,
                status: 404
            })
        }
        resolve(row)
    })
}

//Check if developer is present
function mustBeInDeveloperArray(array, developer) {
    return new Promise((resolve, reject) => {
        const row = array.filter(r => r.developers.includes(developer))
        if (!row) {
            reject({
                message: 'Cannot find Developer with name: ' + developer,
                status: 404
            })
        }
        resolve(row)
    })
}

//Check if scrumMaster is present
function mustBeInScrumArray(array, scrumMaster){
    return new Promise((resolve, reject) => {
        const row = array.filter(r => r.scrumMasterName == scrumMaster)
        if (!row) {
            reject({
                message: 'Cannot find Developer with name: ' + scrumMaster,
                status: 404
            })
        }
        resolve(row)
    })
}

//Writing to JSON File
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    mustBeInDeveloperArray,
    mustBeInScrumArray
}