const Operation = require('../models/operation.model.js')
const mongoose = require('mongoose')


exports.calculationService = async (email, value1, value2, operator) => {
	try{
		let result = 0;
		//perform arithmetic operation
		switch(operator) {
			case '+': result = value1+value2;
				break;
			case '-': result = value1-value2;
				break;
			case '*': result = value1*value2;
				break;
			case '/': {
				if(value2 === 0) {
					throw new Error("Zero division error denominator can't be zero in division");
				}
				result = value1/value2;
				break;
			}
		}

		// console.log("Computed result: ", result);

		const newOperation = new Operation({
			email: email,
			value1: value1,
			value2: value2,
			result: result,
			operator: operator
		})

		await newOperation.save();

		return result;
	}
	catch(err) {
		throw new Error(err.message)
	}
}


exports.getHistoryService = async (email) => {
	try{

		const operations = await Operation.find({ email: email, isDeleted: false })
							.sort( { 'createdAt': -1 } );

		// console.log("Operations history: ", operations);
		// console.log("History records: ", operations.length)

		return operations;

	}
	catch(err) {
		throw new Error(err.message);
	}
}


exports.clearHistoryService = async (id) => {
	try{

		const operation = await Operation.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
		if(!operation) {
			return false;
		}
		console.log("Deleted operation: ", operation)
		return true;

	}
	catch(err) {
		throw new Error(err.message)
	}  
}

exports.resetHistoryService = async (email) => {
	try{
		const operations = await Operation.deleteMany({ email: email });
		console.log("Deleted entries: ", operations);

		if(operations.deletedCount === 0) {
			throw new Error("history for given email does not exists");
		}
	}
	catch(err) {
		throw new Error(err.message)
	}
}













