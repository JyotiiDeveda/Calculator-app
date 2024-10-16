const express = require('express')
const dotenv = require('dotenv').config();
const  dbConnect = require('./config/db/database.js')
const routes = require('./routes/operation.route.js')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger/swagger.js')

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/operations',  routes);

// testing route
app.get('/', (req, res) => {
	res.json({msg: "Hello from Nodejs"})
})


dbConnect();

app.listen(port, () => {
	console.log("Server is running on port ", port);
})

module.exports = app;


