import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductDetail from "./pages/ProductDetail"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import CheckoutConfirmation from "./pages/CheckoutConfirmation"
import { ProductContextProvider } from "./contexts/ProductContext"
import MakePayment from "./pages/MakePayment"
import SearchProduct from "./pages/SearchProduct"
import Header from "./components/Header"
import Footer from "./components/Footer"

function AppRoutes() {
	return (
		<>
			<BrowserRouter>
				<ProductContextProvider>
					<div className="bg-white">
						<div className="container mx-auto">
							<Header />
						</div>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product-detail/:productId" element={<ProductDetail />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/make-payment" element={<MakePayment />} />
						<Route path="/search-product" element={<SearchProduct />} />
						<Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
						<Route path="*" element={<h1 className="text-center">404</h1>} />
					</Routes>
				</ProductContextProvider>
			</BrowserRouter>
		</>
	)
}

export default AppRoutes
