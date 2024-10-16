const Operation = require('../models/operation.model.js')
const { calculationService, 			
		getHistoryService, 
		clearHistoryService, 
		resetHistoryService } = require('../services/operation.service.js')

const { validateEmail } = require('../validators/operation.validator.js')

exports.calculate = async (req, res) => {
	try{
		const { email, value1, value2, operator} = req.body;
		const operators = ["+", "-", "*", "/"]

		console.log(`value1: ${value1} value2: ${value2} email: ${email} operator: ${operator}` )


		// check if values are number
		if(!email || (typeof value1 !== 'number') || (typeof value2 !== 'number') || !operator) {
			throw new Error("All fields are required and operands should be numbers")
		} 		
	

		// email validation

		if(!validateEmail(email)) {
			throw new Error("Invalid email")
		}

		// operator validation
		if(!operators.includes(operator)) {
			throw new Error("Invalid operator (Supported operators are +, -, *, /)")
		}
		
		const result = await calculationService(email, value1, value2, operator);
		// console.log("Result: ", result)

		if(!result) {
			throw new Error("Operation failure")
		}

		return res.status(201).json({
			success: true,
			message: "Operation performed successfully",
			result: result
		})

	}
	catch(err) {
		return res.status(400).json({
			success: false,
			error: err.message,
			message: "Failed to perform calculation"
		})
	}

}


exports.getUserHistory = async (req, res) => {
	try{
		const { email } = req.headers;
		// console.log("Destructured email: ", email);

		if(!email) {
			throw new Error("Email required");
		}

		if(!validateEmail(email)) {
			throw new Error("Invalid email, calculation history cannot exists")
		}

		// get history
		const operationsList = await getHistoryService(email);

		if(!operationsList || operationsList.length === 0) {
			throw new Error("Calculation history for user does not exist");
		} 

		return res.status(200).json({
			success: true,
			message: "Fetched users history",
			history: operationsList
		})
	}
	catch(err) {
		return res.status(400).json({
			success: false,
			message: "Couldn't get history",
			error: err.message
		})
	}
}



exports.clearHistory = async (req, res) => {
	try {
		const operation_id = req.params.id;

		if(!operation_id) {
			throw new Error("Operation id required")
		}
		// console.log("Destructured operation id: ", operation_id);

		if(!await clearHistoryService(operation_id)) {
			return res.status(404).json({
				success: false,
				message: "No operation found with given id"
			})
		}

		return res.status(200).json({
			success: true,
			message: "Deleted operation successfully",
		})

	}
	catch(err) {
		return res.status(400).json({
			success: false,
			error: err.message
		})
	}
}




exports.resetHistory = async (req, res) => {
	try {
		const { email } = req.headers;

		if(!email) {
			throw new Error("Email required")
		}
		// console.log("Destructured email: ", email);

		if(!await resetHistoryService(email)) {
			return res.status(404).json({
				success:true,
				error: "No history found"
			})
		}

		return res.status(200).json({
			success: true,
			message: "Reset user's calculation history successfully",
		})

	}
	catch(err) {
		return res.status(400).json({
			success: false,
			error: err.message
		})
	}
}



