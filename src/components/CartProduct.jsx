import React, { useContext, useEffect, useState } from "react"
import { RiDeleteBin7Line } from "react-icons/ri"
import { ProductContext } from "../contexts/ProductContext"

function CartProduct({ product }) {
	const { removeProductCart, setQuantityProduct } = useContext(ProductContext)
	const [buttonSubtract, setButtonSubtract] = useState(true)
	const [buttonAdd, setButtonAdd] = useState(true)

	useEffect(() => {
		if (product.quantity <= 1) {
			setButtonSubtract(false)
		} else {
			setButtonSubtract(true)
		}
		if (product.quantity >= 31) {
			setButtonAdd(false)
		} else {
			setButtonAdd(true)
		}
	}, [product.quantity])

	return (
		<div className="flex gap-7 items-center justify-between shadow-md p-2.5 border rounded-lg bg-white w-full">
			<div className="flex gap-4 items-center">
				<img className="rounded-lg w-20" src={product.image} alt="imgProduct" />
				<div className="font-bold">
					<h1>
						{product.name.slice(0, 17)}
						{product.name.length > 17 && "..."}
					</h1>
					<h3 className="text-gray-600 text-sm">$ {product.price}</h3>
				</div>
			</div>
			<div className="flex flex-col gap-3 items-center text-sm">
				<div className="flex gap-3 items-center">
					<button
						className={`bg-gray-100 hover:bg-gray-300 shadow-lg w-8 rounded-md font-bold ${
							!buttonSubtract && "invisible"
						}`}
						onClick={() => setQuantityProduct(product.productId, -1)}
					>
						-
					</button>
					<p className="font-bold">{product.quantity}</p>
					<button
						className={`bg-gray-100 hover:bg-gray-300 shadow-lg w-8 rounded-md font-bold ${
							!buttonAdd && "invisible"
						}`}
						onClick={() => setQuantityProduct(product.productId, +1)}
					>
						+
					</button>
				</div>
				<button
					className="mr-1.5 flex items-center gap-2 text-red-700"
					onClick={() => removeProductCart(product.productId)}
				>
					Eliminar
					<RiDeleteBin7Line />
				</button>
			</div>
		</div>
	)
}

export default CartProduct
