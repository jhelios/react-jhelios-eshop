import React from "react"

function ConfirmationProduct({ product }) {
	return (
		<div className="flex gap-4 items-center mt-5 justify-between w-full">
			<div className="font-bold flex gap-4 items-center">
				<img className="rounded-lg w-[75px]" src={product.image} alt="imgProduct" />
				<div>
					<h1 className="text-sm">
						{product.name.slice(0, 17)}
						{product.name.length > 17 && "..."}
					</h1>
					<h3 className="text-gray-600 text-sm">$ {product.price}</h3>
				</div>
			</div>
			<p className="font-bold">{product.quantity}</p>
		</div>
	)
}

export default ConfirmationProduct
