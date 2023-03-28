# Aakash-Saini-IS24-full-stack-competition-req97073
Web Application that tracks and manages Web Applications developed by the Ministry of BC

ReactJS and Node.js Project
This project is a Full Stack Web application built with ReactJS and Node.js. This file demonstrates how to use these technologies to run this web application.

Getting Started
To get started with this project, follow these steps:

1. Clone this repository to your local machine using the following steps:

   git clone https://github.com/Aakash145/Aakash-Saini-IS24-full-stack-competition-req97073.git


2. Install the necessary dependencies for both the client and server applications. From the root directory of the project, run the following commands:

    𝐜𝐝 𝐩𝐫𝐨𝐝𝐮𝐜𝐭-𝐛𝐚𝐜𝐤𝐞𝐧𝐝 && 𝐧𝐩𝐦 𝐢𝐧𝐬𝐭𝐚𝐥𝐥

    𝐜𝐝 ../𝐩𝐫𝐨𝐝𝐮𝐜𝐭-𝐟𝐫𝐨𝐧𝐭𝐞𝐧𝐝 && 𝐧𝐩𝐦 𝐢𝐧𝐬𝐭𝐚𝐥𝐥

3. Start the server by running the following command from the product-backend directory:

    𝐧𝐩𝐦 𝐫𝐮𝐧 𝐝𝐞𝐯

    This will start the server at http://localhost:3000.

    Start the client by running the following command from the product-frontend directory:

    𝐧𝐩𝐦 𝐬𝐭𝐚𝐫𝐭

    This will start the client at http://localhost:3001. (Please verify if the React Client App is running on PORT 3001 as the PORT 3000 would already be in use for the backend - The reason an environment variable is not setup or PORT not added manually was the other system might decline running it on the requested PORT)

4. Navigate to http://localhost:3001/products in your web browser to view the application.

   This project also includes the Swagger API Documentation for understanding the use of RESTful API's which can be accessed        using:http://localhost:3000/api-docs


    Technologies Used
    This project uses the following technologies:

    ReactJS (and it's libraries)
    Node.js
    Express
    JSON File (Mock Data has already been added for testing).
    
    
    Steps on how to perform all the operations:
    - Get All Products:
    1. Go to http://localhost:3001/products
    2. All the Products will be listed as entered. (In LowerCase or UpperCase, developers will be separated by spaces)
    
    - Add a Product:
    1. Go to http://localhost:3001/products
    2. Click on Add, you will be redirected to the add products page
    3. Fill all the fields, all of them are mandatory. (Developer names should be separated by commas ",")
    4. Click on Submit and your Product will be added to the list.
    5. Go back to the Products Lis page by clicking on Products.
    
    - Search a Developer or Scrum Master:
    1. Go to http://localhost:3001/products
    2. On the search bar, enter the developer/scrumMaster name(Copying it from the list is preferred for ease of use) and paste onto the search field.
    3. Click on Developer or Scrum Master Button to start the Search.
    4. The results will be displayed as per the request.
    
    - Editing an existing product:
    1. Go to http://localhost:3001/products
    2. On any Product Listed, click on Edit on the right most corner.
    3. Update the fields as requested, make sure all fields are entered as they are mandatory.
    4. Click on Update, and hence your data would be updated with a success message.
    
    - Deleting an existing product:
    1. Go to http://localhost:3001/products
    2. On any Product Listed, click on Edit on the right most corner.
    3. Click on Delete, and hence your data would be deleted with a success message.
