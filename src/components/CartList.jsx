import React, { useContext, useEffect } from "react"
import CartProduct from "./CartProduct"
import { RiArrowDropUpLine, RiDeleteBin2Line } from "react-icons/ri"
import { ProductContext } from "../contexts/ProductContext"
import { Link, useNavigate } from "react-router-dom"

function CartList({ setOpenCart }) {
	const navigation = useNavigate()
	const { cart, setCart, totalPriceProducts } = useContext(ProductContext)

	const makePayment = () => {
		setOpenCart(false)
		navigation("/checkout")
	}

	return (
		<div className="absolute flex flex-col gap-3 items-center right-[58px] 2xl:right-[260px] top-[84px] z-50 bg-white border-x-2 border-gray-300 border-b-2 border-l-2 border-r-2 shadow-xl rounded-b-xl p-6 pt-5 max-h-[580px] 2xl:max-h-[760px] overflow-y-auto">
			<h3 className="text-center text-2xl font-bold mb-3">Tu Carrito</h3>
			<button
				className="absolute right-0 top-0 bg-gray-700/25 rounded-full m-2.5 flex items-center text-white"
				onClick={() => {
					setOpenCart(false)
				}}
			>
				<RiArrowDropUpLine size="3.1em" />
			</button>
			{cart.length <= 0 && (
				<>
					<p className="mb-4 mx-7 text-gray-700">No se han agregado productos</p>
					<Link
						to="/"
						onClick={() => {
							setOpenCart(false)
						}}
						className="bg-sky-500 text-white font-bold py-3 rounded-xl px-12"
					>
						Ir a comprar
					</Link>
				</>
			)}
			{cart.length > 0 && (
				<>
					{cart.map((product) => (
						<CartProduct product={product} key={product.productId} />
					))}
					<button className="flex flex-col items-center" onClick={() => setCart([])}>
						<div className="flex gap-2 text-sm text-gray-500">
							<RiDeleteBin2Line size="1.1em" /> Limpiar carrito
						</div>
						<h3 className="text-xl font-extrabold mt-5 rounded-lg">Total: $ {totalPriceProducts}</h3>
					</button>

					<button
						className="bg-blue-700 text-white font-bold py-3 rounded-xl px-12"
						onClick={() => makePayment()}
					>
						Continuar con la compra
					</button>
				</>
			)}
		</div>
	)
}

export default CartList
