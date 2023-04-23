import React, { useContext, useState } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import { ProductContext } from "../contexts/ProductContext"

function Pagination({
	totalPages,
	startPagination,
	endPagination,
	setStartPagination,
	setEndPagination,
	quantityProducts,
}) {
	const { products, filteredProducts } = useContext(ProductContext)
	const [currentPage, setCurrentPage] = useState(1)

	const nextPage = () => {
		setCurrentPage(currentPage + 1)
		setStartPagination((current) => current + quantityProducts)
		setEndPagination((current) => current + quantityProducts)
	}

	const beforePage = () => {
		setCurrentPage(currentPage - 1)
		setStartPagination((current) => current - quantityProducts)
		setEndPagination((current) => current - quantityProducts)
	}

	return (
		<div className="flex justify-center mb-2 mt-5">
			<button
				className={`inline-flex items-center px-4 py-2 text-blue-700 rounded-lg hover:bg-white ${
					startPagination <= 0 && "invisible"
				}`}
				onClick={() => beforePage()}
			>
				<RiArrowLeftSLine size="1.7em" />
			</button>
			<h3 className="items-center m-2">
				<strong>{currentPage}</strong>
			</h3>
			<p className="inline my-2 px-1">de</p>
			<h3 className="items-center m-2">
				<strong>{totalPages}</strong>
			</h3>
			<button
				className={`inline-flex items-center px-4 py-2 text-blue-700 rounded-lg hover:bg-white ${
					filteredProducts.length == 0
						? endPagination >= products.length && "invisible"
						: endPagination >= filteredProducts.length && "invisible"
				}`}
				onClick={() => nextPage()}
			>
				<RiArrowRightSLine size="1.7em" />
			</button>
		</div>
	)
}

export default Pagination
