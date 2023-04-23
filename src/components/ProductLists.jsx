import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import ProductItem from "./ProductItem"
import Pagination from "./Pagination"
import { ProductContext } from "../contexts/ProductContext"

function ProductLists() {
	const { products, filteredProducts } = useContext(ProductContext)
	const [quantityProducts] = useState(10)
	const [startPagination, setStartPagination] = useState(0)
	const [endPagination, setEndPagination] = useState(quantityProducts)
	const [totalPages, setTotalPages] = useState(1)
	const [productList, setProductList] = useState([])

	useLayoutEffect(() => {
		setTotalPages(Math.ceil(productList.length / quantityProducts))
	}, [productList])

	useEffect(() => {
		if (filteredProducts.length > 0) {
			setProductList(filteredProducts)
		} else {
			setProductList(products)
		}
	}, [filteredProducts])

	return (
		<>
			<div className="flex flex-wrap justify-center gap-7">
				{productList.slice(startPagination, endPagination).map((product) => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
			<Pagination
				totalPages={totalPages}
				startPagination={startPagination}
				endPagination={endPagination}
				setStartPagination={setStartPagination}
				setEndPagination={setEndPagination}
				quantityProducts={quantityProducts}
			/>
		</>
	)
}

export default ProductLists
