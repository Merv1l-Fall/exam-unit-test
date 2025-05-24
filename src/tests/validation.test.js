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
	// 1. it returns true for a valid cart object
	// 2. it returns false for invalid cart objects

	// 3. it returns true for a valid product
	// 4. it returns false for invalid cart objects

describe("isProduct", () => {
	test("it  returns true for valid product", () => {
		expect(isProduct(exampleProduct)).toBe(true)
	})
	test("it returns false for invalid product", () => {
		const invalidProduct = {
			id: 1001,
			name: "Karlsson"
		}
		expect(isProduct(invalidProduct)).toBe(false)
	})
})


	describe("isCartItem", () => {
		test("returns true for a valid cart item", () => {
			expect(isCartItem(exampleCartObject)).toBe(true)
		})

		test("returns false for invalid cart item with negative amount", () => {
			const invalidCartItem = { ...exampleCartObject, amount: -1 }
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with amount 0", () => {
			const invalidCartItem = { ...exampleCartObject, amount: 0 }
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with amount as a string", () => {
			const invalidCartItem = { ...exampleCartObject, amount: "one" }
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with invalid id", () => {
			const invalidCartItem = { ...exampleCartObject }
			delete invalidCartItem.id
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for invalid cart item with invalid item", () => {
			const invalidCartItem = { ...exampleCartObject, item: "David" }
			expect(isCartItem(invalidCartItem)).toBe(false)
		})

		test("returns false for cart item with id as string", () => {
			const invalidCartItem = { ...exampleCartObject, id: "2001" };
			expect(isCartItem(invalidCartItem)).toBe(false);
		});

		test("returns false for cart item with item as null", () => {
			const invalidCartItem = { ...exampleCartObject, item: null };
			expect(isCartItem(invalidCartItem)).toBe(false);
		});

		test("returns false for cart item with item missing product fields", () => {
			const invalidProduct = { id: 1001, name: "Product" }; // Saknar price
			const invalidCartItem = { ...exampleCartObject, item: invalidProduct };
			expect(isCartItem(invalidCartItem)).toBe(false);
		});
	})
})