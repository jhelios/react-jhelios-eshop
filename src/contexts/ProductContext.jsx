import React, { createContext, useEffect, useState } from "react"
import productList from "../assets/products.json"
import useLocalStorage from "../hooks/useLocalStorage"

const ProductContext = createContext()

function ProductContextProvider({ children }) {
	const { item: products, saveItem: setProducts } = useLocalStorage("products", [])
	const { item: filteredProducts, saveItem: setFilteredProducts } = useLocalStorage("filteredProducts", [])
	const { item: cart, saveItem: setCart } = useLocalStorage("cart", [])
	const { item: formData, saveItem: setFormData } = useLocalStorage("formData", {
		name: "",
		address: "",
		email: "",
		city: "",
		paypalMethod: "off",
	})
	const { item: isSearch, saveItem: setIsSearch } = useLocalStorage("isSearch", 0)
	const {
		item: totalPriceProducts,
		saveItem: setTotalPriceProducts,
		loading: loadingTotalPriceProducts,
	} = useLocalStorage("totalPriceProducts", 0)
	const { item: shippingCost, saveItem: setShippingCost } = useLocalStorage("shippingCost", 0)
	const { item: totalPricePurchase, saveItem: setTotalPricePurchase } = useLocalStorage("totalPricePurchase", 0)
	const { item: cartConfirmation, saveItem: setCartConfirmation } = useLocalStorage("cartConfirmation", [])
	const [showToast, setShowToast] = useState([])
	const [searchValue, setSearchValue] = useState("")

	useEffect(() => {
		setProducts(productList)
	}, [])

	useEffect(() => {
		setTotalPriceProducts(
			cart.reduce((acc, curr) => Math.round((acc + curr.price * curr.quantity) * 100) / 100, 0)
		)
	}, [cart])

	const getProductByID = (productId) => {
		const product = products.filter((prod) => prod.id == productId)
		return product[0]
	}

	const addToCart = ({ productId, quantity, price, name, image }) => {
		let newCart = cart
		const filteredCart = cart.filter((product) => product.productId === productId)
		if (filteredCart.length > 0) {
			newCart = cart.map((product) => {
				if (product.productId === productId)
					return { productId, quantity: product.quantity + quantity, price, name, image }
				return product
			})
		} else {
			newCart = [...cart, { productId, quantity, price, name, image }]
		}
		setCart(newCart)
	}

	const setQuantityProduct = (productId, quantity) => {
		const newCart = cart.map((product) => {
			if (product.productId === productId) {
				product.quantity = product.quantity + quantity
			}
			return product
		})
		setCart(newCart)
	}

	const removeProductCart = (productId) => {
		const newCart = cart.filter((product) => {
			if (product.productId !== productId) {
				return product
			}
		})
		console.log(newCart)
		setCart(newCart)
	}

	const filterProducts = (searchValue) => {
		const newProducts = products.filter((product) => {
			if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
				return product
			}
		})
		setFilteredProducts(newProducts)
	}

	return (
		<ProductContext.Provider
			value={{
				products,
				getProductByID,
				cart,
				setCart,
				addToCart,
				setQuantityProduct,
				removeProductCart,
				totalPriceProducts,
				setTotalPriceProducts,
				shippingCost,
				setShippingCost,
				formData,
				setFormData,
				totalPricePurchase,
				setTotalPricePurchase,
				showToast,
				setShowToast,
				isSearch,
				setIsSearch,
				filteredProducts,
				setFilteredProducts,
				filterProducts,
				searchValue,
				setSearchValue,
				cartConfirmation,
				setCartConfirmation,
				loadingTotalPriceProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export { ProductContext, ProductContextProvider }
