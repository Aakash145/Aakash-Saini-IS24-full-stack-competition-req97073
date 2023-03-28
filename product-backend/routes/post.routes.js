const express = require('express')
const router = express.Router()
const product = require('../models/post.model')
const m = require('../helpers/middlewares')

// Routes

 /**
  * @swagger
  * tags:
  *   name: Projects
  *   description: The Ministry Projects managing API
  */

 /**
 * @swagger
 * definitions:
 *   Project:
 *     properties:
 *       projectName:
 *         type: string
 *       projectOwnerName:
 *         type: string
 *       developers:
 *         type: array
 *       startDate:
 *         type: string
 *       scrumOwnerName:
 *         type: string
 *       methodology:
 *         type: string
 */

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns the health of the api
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An uptime with message and timestamp
 */
//HealthCheck Endpoint
router.get('/', async (_req, res, _next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns all the projects
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the list of all projects
 *     schema:
 *           $ref: '#/definitions/Project'
 */
//All posts
router.get('/products', async (req, res) => {
    await product.getProducts()
    .then(products => res.json(products))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns all the projects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Project's ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns a project based on ID 
 *     schema:
 *           $ref: '#/definitions/Project'
 */
//Get a product by id
router.get('/products/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await product.getProduct(id)
    .then(product => res.json(product))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Projects
 *     description: Creates a new project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Project
 *         description: Project object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Project'
 *     responses:
 *       200:
 *         description: Successfully created
 */
//Insert a new Product
router.post('/products', m.checkFieldsPost, async (req, res) => {
    await product.insertProduct(req.body)
    .then(product => res.status(201).json({
        message: `The post #${product.productId} has been created`,
        content: product
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     description: Updates an existing project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Project
 *         description: Project object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Project'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
// Update a product
router.put('/products/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await product.updateProduct(id, req.body)
    .then(product => res.json({
        message: `The product #${id} has been updated`,
        content: product
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     description: Deletes a single project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: project's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// Delete a Product
router.delete('/products/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await product.deleteProduct(id)
    .then(product => res.json({
        message: `The product #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/**
 * @swagger
 * /api/developers/{developer}:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns all the projects on which the developer is working on
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: developer
 *         description: A developer's name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all the projects based on developer name 
 *     schema:
 *           $ref: '#/definitions/Project'
 */
//Search Developers
router.get('/developers/:developer', async (req, res) => {
    const developer = req.params.developer
    await product.getDevelopers(developer)
    .then(product => res.json(product))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/**
 * @swagger
 * /api/scrumMaster/{scrumMaster}:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns all the projects on which the Scrum Master is working on
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: scrumMaster
 *         description: A Scrum Master's name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all the projects based on Scrum Master's name 
 *     schema:
 *           $ref: '#/definitions/Project'
 */
//Search Scrum Master
router.get('/scrumMaster/:scrumMaster', async (req, res) => {
    const scrumMaster = req.params.scrumMaster
    await product.getScrumMaster(scrumMaster)
    .then(product => res.json(product))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

module.exports = router