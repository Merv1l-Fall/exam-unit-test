// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(object) {
	if(
		typeof object.id !== "number" ||
		typeof object.amount !== "number" ||
		typeof object.item !== "object" ||
		typeof object.item !== "object" || object.item === null
	) {
		return false;
	}
	return true;
}

function isProduct(object) {
	if(
		typeof object !== "object" || object === null ||
		typeof object.id !== "number" ||
		typeof object.name !== "string" ||
		typeof object.price !== "number"
	) {
		return false;
	}
	return true;
}


export { isCartItem, isProduct }
