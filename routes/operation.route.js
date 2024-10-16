const router = require('express').Router();

const { calculate, 
		getUserHistory, 
		clearHistory, 
		resetHistory } 
		= require('../controllers/operation.controller.js')

/**
 * @swagger
 * tags:
 *   - name: Operation
 *     description: Calculator app API
 */

/**
 * @swagger
 * /api/operations:
 *   post:
 *     summary: Execute an arithmetic operation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value1:
 *                 type: number
 *                 description: First operand
 *                 example: 10
 *               value2:
 *                 type: number
 *                 description: Second operand
 *                 example: 20
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: 'test@gmail.com'
 *               operator:
 *                 type: string
 *                 description: Arithmetic operator (e.g., "+", "-", "*", "/")
 *                 example: "+"
 *     responses:
 *       201:
 *         description: The operation was performed successfully
 *       400:
 *         description: Bad request, invalid input data
 */


router.post('/', calculate);


/**
 * @swagger
 * /api/operations:
 *   get:
 *     summary: Retrieve calculation history
 *     description: Gets the calculation history for a specific user based on their email.
 *     parameters:
 *       - in: header
 *         name: email
 *         required: true
 *         description: User's email address to retrieve the history.
 *         type: string
 *     responses:
 *       200:
 *         description: Calculation history retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             history:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the operation
 *                   value1:
 *                     type: integer
 *                     description: First operand
 *                   value2:
 *                     type: integer
 *                     description: Second operand
 *                   operator:
 *                     type: string
 *                     description: The operator used for the calculation
 *                   result:
 *                     type: integer
 *                     description: The result of the calculation
 */


router.get('/', getUserHistory) 


/**
 * @swagger
 * /api/operations/{id}:
 *   delete:
 *     summary: Delete an operation by ID
 *     description: Deletes a specific operation from the database using the operation ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the operation to delete.
 *         type: string
 *     responses:
 *       200:
 *         description: Operation deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Operation deleted successfully."
 *       404:
 *         description: Operation not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Operation with given ID not found."
 */
router.delete('/:id', clearHistory);

/**
 * @swagger
 * /api/operations:
 *   delete:
 *     summary: Reset all calculation history
 *     description: Deletes all calculation history for a user based on their email address.
 *     parameters:
 *       - in: header
 *         name: email
 *         required: true
 *         description: User's email address to identify which history to reset.
 *         type: string
 *     responses:
 *       200:
 *         description: All calculation history deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "All calculation history deleted successfully."
 *       404:
 *         description: No history found for the given email
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "No calculation history found for the given email."
 */

router.delete('/', resetHistory);


module.exports = router;  








