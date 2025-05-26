// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue, removeFromCart, editCart } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart()
	})


	// -------------------------------------------------- //
	// Skriv dina testfall här

	// Du får ett test att börja med
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount()
		const input = { id: 1002, name: 'Vattenpistol', price: 40 }

		addToCart(input)
		const itemCountAfter = getCartItemCount()

		expect(itemCountAfter).toBe(itemCountBefore + 1)
	})

	test("getCartItemCount returns correct number", () => {
		addToCart({ id: 1, name: "Boll", price: 20 })
		addToCart({ id: 2, name: "Hink", price: 30 })

		expect(getCartItemCount()).toBe(2)
	})

	describe("getItems", () => {

		test("getItem gets the correct item by index", () => {
			const product = { id: 1003, name: "Boll", price: 20 }
			addToCart(product)

			const cartItem = getItem(0)

			expect(cartItem.item).toEqual(product)
			expect(cartItem.amount).toBe(1) // Default amount is 1
			expect(typeof cartItem.id).toBe("number") // Ensure id is a number
		})

		test("getItem returns null for negative index", () => {
			addToCart({ id: 1004, name: "Snurra", price: 30 })

			const result = getItem(-1)
			expect(result).toBeNull()
		})

		test("getItem returns null for index out of bounds", () => {
			addToCart({ id: 1005, name: "Hink", price: 25 })

			const result = getItem(1) // Assuming only one item in cart
			expect(result).toBeNull()
		})

		test("getItem returns null when cart is empty", () => {
			const result = getItem(0)
			expect(result).toBeNull()
		})
	})

	describe("getTotalCartValue", () => {

		test("getTotalCartValue returns 0 for empty cart", () => {
			expect(getTotalCartValue()).toBe(0)
		})

		test("getTotalCartValue returns correct total for single item", () => {
			addToCart({ id: 1006, name: "Boll", price: 20 })
			expect(getTotalCartValue()).toBe(20)
		})

		test("getTotalCartValue returns correct total for multiple items", () => {
			addToCart({ id: 1007, name: "Hink", price: 30 })
			addToCart({ id: 1008, name: "Spade", price: 50 })

			expect(getTotalCartValue()).toBe(80) // should be 30 + 50 in this case
		})
	})

	describe("removeFromCart", () => {
		test("remove a product from the cart", () => {
			const product = { id: 1009, name: "Boll", price: 20 }
			addToCart(product)

			const itemCountBefore = getCartItemCount()
			const cartItem = getItem(0) // Get the item just added
			const result = removeFromCart(cartItem.id)

			expect(result).toBe(true)
			expect(getCartItemCount()).toBe(itemCountBefore - 1)
		})

		test("removeFromCart returns false if item not found", () => {
			const result = removeFromCart(9999) // Nonexistent ID
			expect(result).toBe(false)
		})
	})

	describe("editCart", () => {
		test("editCart updates the amount of an item", () => {
			const product = { id: 1010, name: "Boll", price: 20 }
			addToCart(product)

			const cartItem = getItem(0) // Get the item just added
			const newValues = { amount: 3 }

			const result = editCart(cartItem.id, newValues)

			expect(result).toBe(true)
			expect(getItem(0).amount).toBe(3)
		})

		test("editCart returns false if item not found", () => {
			const newValues = { amount: 2 }
			const result = editCart(9999, newValues) // Id that does not exist
			expect(result).toBe(false)
		})

		test("editCart throws error on invalid amount", () => {
			const product = { id: 1011, name: "Bil", price: 100 }
			addToCart(product)

			const cartItem = getItem(0)

			expect(() => {
				editCart(cartItem.id, { amount: -5 })
			}).toThrow("amount must be a positive number")
		})

		test("editCart throws error if newValues is null", () => {
			const product = { id: 1011, name: "Boll", price: 20 }
			addToCart(product)
			const cartItem = getItem(0)

			expect(() => {
				editCart(cartItem.id, null)
			}).toThrow("newValues must be a non-null object")
		})

		test("editCart throws error if newValues is not an object", () => {
			const product = { id: 1012, name: "Boll", price: 20 }
			addToCart(product)
			const cartItem = getItem(0)

			expect(() => {
				editCart(cartItem.id, 42)
			}).toThrow("newValues must be a non-null object")
		})
	})


	// -------------------------------------------------- //
})
