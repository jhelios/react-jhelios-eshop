import React from "react"
import ProductLists from "../components/ProductLists"
import Footer from "../components/Footer"

function SearchProduct() {
	return (
		<div className="flex flex-col h-screen">
			<div className="container mx-auto flex flex-col">
				<p className="text-center mt-7 mb-8 text-3xl font-bold">Productos encontrados</p>
				<ProductLists />
			</div>
			<div className="shrink-0 mt-auto bg-white shadow-lg">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default SearchProduct
