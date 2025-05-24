import { isCartItem, isProduct } from "../validation.js"
// Examples of a valid product and a valid cart item. You may use these when testing below.
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

// Group tests using "describe"
describe('Validation', () => {

	describe("isProduct", () => {
		test("it  returns true for valid product", () => {
			expect(isProduct(exampleProduct)).toBe(true)
		})

		test("it returns false for invalid product with negative price", () => {
			const invalidProduct = { ...exampleProduct, price: 2 } // Invalid price as negative number
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with price 0", () => {
			const invalidProduct = { ...exampleProduct, price: 0 } // Invalid price as 0
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with price as a string", () => {
			const invalidProduct = { ...exampleProduct, price: "fifty" } // Invalid price as string
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("returns false for invalid price as null", () => {
			const invalidProduct = { ...exampleProduct, price: null } // Invalid price as null
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with no id", () => {
			const invalidProduct = { ...exampleProduct }
			delete invalidProduct.id // No id
			expect(isProduct(invalidProduct)).toBe(false)
		})
		
		test("it returns false for invalid product with id as string", () => {
			const invalidProduct = { ...exampleProduct, id: "1001" }; // Invalid id type
			expect(isProduct(invalidProduct)).toBe(false);
		});

		test("it returns false for invalid product with id as null", () => {
			const invalidProduct = { ...exampleProduct, id: null }; // Invalid id type
			expect(isProduct(invalidProduct)).toBe(false);
		});

		test("it returns false for invalid product with no name", () => {
			const invalidProduct = { ...exampleProduct }
			delete invalidProduct.name // No name
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with name as empty string", () => {
			const invalidProduct = { ...exampleProduct, name: "" } // Invalid name as empty string
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with name as null", () => {
			const invalidProduct = { ...exampleProduct, name: null } // Invalid name as null
			expect(isProduct(invalidProduct)).toBe(false)
		})

		test("it returns false for invalid product with missing fields", () => {
			const invalidProduct = { id: 1001, name: "Product" }; // Missing price
			expect(isProduct(invalidProduct)).toBe(false)
		})

	})


	describe("isCartItem", () => {
		test("returns true for a valid cart item", () => {
			expect(isCartItem(exampleCartObject)).toBe(true)
		})

		test("returns false for invalid cart item with negative amount", () => {
			const invalidCartItem = { ...exampleCartObject, amount: -1 } //invalid amount as negative number
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with amount 0", () => {
			const invalidCartItem = { ...exampleCartObject, amount: 0 } //invalid amount as 0
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with amount as a string", () => {
			const invalidCartItem = { ...exampleCartObject, amount: "one" } //invalid amount as string
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with invalid id", () => {
			const invalidCartItem = { ...exampleCartObject }
			delete invalidCartItem.id //no id
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with invalid item", () => {
			const invalidCartItem = { ...exampleCartObject, item: "David" } //invalid item
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for cart item with id as string", () => {
			const invalidCartItem = { ...exampleCartObject, id: "2001" }; // Invalid id type
			expect(isCartItem(invalidCartItem)).toBe(false);
		});

		test("returns false for cart item with item as null", () => {
			const invalidCartItem = { ...exampleCartObject, item: null }; // Invalid item type
			expect(isCartItem(invalidCartItem)).toBe(false);
		});

		test("returns false for cart item with item missing product fields", () => {
			const invalidProduct = { id: 1001, name: "Product" }; // Saknar price
			const invalidCartItem = { ...exampleCartObject, item: invalidProduct }; // Invalid item structure
			expect(isCartItem(invalidCartItem)).toBe(false);
		});
	})
})