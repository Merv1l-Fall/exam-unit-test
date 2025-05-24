import Joi from "joi";

// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

const productSchema = Joi.object({
	id: Joi.number().integer().min(0).required(),
	name: Joi.string().min(1).required(),
	price: Joi.number().positive().required()
});


function isCartItem(object) {
	if(
		typeof object.id !== "number" ||
		typeof object.amount !== "number" ||
		typeof object.item !== "object" || object.item === null ||
		!isProduct(object.item)
	) {
		return false;
	}
	return true;
}

function isProduct(object) {
	const { error } = productSchema.validate(object);
	return !error;
}


export { isCartItem, isProduct }
