import React from "react"
import { Link } from "react-router-dom"

function ProductItem({ product }) {
	return (
		<Link
			className="w-[222px] 2xl:w-[251px] h-[228px] 2xl:h-[248px] hover:bg-gray-300/50 bg-white rounded-lg shadow-lg flex flex-col"
			to={`/product-detail/${product.id}`}
		>
			<img
				className="rounded-t-lg w-full h-[148px] 2xl:h-[168px] object-cover"
				src={product.images[0].url}
				alt="imgProduct"
			/>
			<div className="text-center my-4 px-3">
				<h3 className="text-md font-extrabold">${product.price}</h3>
				<p className="text-md">
					{product.name.slice(0, 22)}
					{product.name.length > 22 && "..."}
				</p>
			</div>
		</Link>
	)
}

export default ProductItem
