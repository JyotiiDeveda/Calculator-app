const app = require('../index.js')
const request = require('supertest')
const { calculate } = require('../controllers/operation.controller.js')

describe('Arithmetic operation', () => {
	it('should perform addition', async () => {
        const res = await request(app)
            .post('/api/operations')
            .send({ email: "abc@gmail.com", value1: 5, value2: 3, operator: "+" });
        expect(res.statusCode).toEqual(201);
        expect(res.body.result).toEqual(8);
    });


    it('Returns a message that values should be numbers', async () => {
        const res = await request(app)
        	.post('/api/operations')
            .send({ email: "abc@gmail.com", value1: "five", value2: "three", operator: '-' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe("All fields are required and operands should be numbers");
    });


    it('Should prompt all fields are required', async () => {
        const res = await request(app)
        	.post('/api/operations')
            .send({ value1: 10, value2: 16, operator: '-' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe("All fields are required and operands should be numbers");
    });


    it('Invalid Email', async () => {
        const res = await request(app)
            .post('/api/operations')
            .send({ email: "abc1234", value1: 10, value2: 16, operator: '-' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe("Invalid email");
    });


    it('Invalid Operator', async () => {
        const res = await request(app)
            .post('/api/operations')
            .send({ email: "abc@gmail.com", value1: 10, value2: 16, operator: '$' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe("Invalid operator (Supported operators are +, -, *, /)");
    });


    it('Should return a zero division error', async () => {
        const res = await request(app)
            .post('/api/operations')
            .send({ email: "abc@gmail.com", value1: 10, value2: 0, operator: "/" });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe("Zero division error denominator can't be zero in division");
    });

})


describe('Getting calculation history', () => {

	it("Should return user's calculation history", async () => {
        const res = await request(app)
            .get('/api/operations')
            .set('email', 'abc@gmail.com');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.history)).toEqual(true);
    });


    it("Should raise an email required prompt", async () => {
        const res = await request(app)
            .get('/api/operations')
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("Email required");
    });


    it("No history exists for given user email", async () => {
        const res = await request(app)
            .get('/api/operations')
            .set('email', 'newuser@gmail.com');
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("Calculation history for user does not exist");
    })

    
    it("No history exists for invalid email", async () => {
        const res = await request(app)
            .get('/api/operations')
            .set('email', 'user123');
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("Invalid email, calculation history cannot exists");
    })


})


describe('Clear history', () => {

	// it('Deletes the operation with given id successfully', async () => {
	// 	const id = '670f58bdb53663afaa5e177e';
	// 	const res = await request(app)
	// 		.delete(`/api/operations/${id}`)
	// 	expect(res.statusCode).toEqual(200)
	// 	expect(res.body.message).toEqual("Deleted operation successfully")
	// })


	it('Operation with given id not found', async () => {
		const id = '670df65bc8ebebc2d4672d71';
		const res = await request(app)
			.delete(`/api/operations/${id}`)
		expect(res.statusCode).toEqual(404)
		expect(res.body.message).toEqual("No operation found with given id")
	})

})


describe('Reset history', () => {

	// it("Resets calculation history for given email", async () => {
	// 	const res = await request(app)
	// 		.delete(`/api/operations`)
	// 		.set('email', 'abc@gmail.com')
	// 	expect(res.statusCode).toEqual(200)
	// 	expect(res.body.message).toEqual("Reset user's calculation history successfully")
	// })

	it("History for given email not found", async () => {
		const res = await request(app)
			.delete(`/api/operations`)
			.set('email', 'jyoti@gmail.com')
		expect(res.statusCode).toEqual(400)
		expect(res.body.error).toEqual("history for given email does not exists")
	})
})




