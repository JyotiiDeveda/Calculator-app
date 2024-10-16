const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	value1: {
		type: Number,
		required: true
	},
	value2: {
		type: Number,
		required: true
	}, 
	operator: {
		type: String,
		required: true
	},
	result: {
		type: Number,
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('Operation', operationSchema);