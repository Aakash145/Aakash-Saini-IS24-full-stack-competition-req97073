// Import packages
const express = require('express')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//Options for Swagger Docs
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Node Swagger API",
			version: "1.0.0",
			description: "Demonstrating how to use the RESTful API with Swagger",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

//Specs for Swagger Docs
const specs = swaggerJsDoc(options);

// App
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



// Starting server
app.listen('3000', () => {
    console.log("listening on port 3000")

})
