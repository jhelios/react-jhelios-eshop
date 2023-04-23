import React, { useContext, useEffect } from "react"
import CarouselMain from "../components/CarouselMain"
import ProductLists from "../components/ProductLists"
import Footer from "../components/Footer"
import { ProductContext } from "../contexts/ProductContext"

function Home() {
	const { setFilteredProducts, setSearchValue } = useContext(ProductContext)

	useEffect(() => {
		setFilteredProducts([])
		setSearchValue("")
	}, [])

	return (
		<>
			<div className="container mx-auto flex flex-col">
				<CarouselMain />
				<p className="text-center mt-7 mb-8 text-3xl font-bold">Conoce nuestros productos</p>
				<ProductLists />
			</div>
			<div className="shrink-0 mt-auto bg-white shadow-lg">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</>
	)
}

export default Home
