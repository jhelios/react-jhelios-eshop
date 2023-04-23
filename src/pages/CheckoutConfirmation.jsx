import React, { useContext, useEffect } from "react"
import Footer from "../components/Footer"
import logoPaypal from "../assets/logoPaypal.png"
import ConfirmationProduct from "../components/ConfirmationProduct"
import { ProductContext } from "../contexts/ProductContext"
import { useNavigate } from "react-router-dom"

function CheckoutConfirmation() {
	const {
		totalPriceProducts,
		shippingCost,
		formData,
		totalPricePurchase,
		setTotalPricePurchase,
		cart,
		setCart,
		cartConfirmation,
		setCartConfirmation,
	} = useContext(ProductContext)
	const navigation = useNavigate()

	useEffect(() => {
		if (cart.length > 0) {
			setCartConfirmation(cart)
			setCart([])
		}
	}, [cart])

	const finishPayment = () => {
		setCartConfirmation([])
		setTotalPricePurchase(0)
		navigation("/")
	}

	return (
		<div className="flex flex-col">
			<div className="container mx-auto mt-4 mb-5 max-w-5xl">
				<div className="bg-white shadow-lg rounded-lg pt-10 pb-5 px-5 border-2 border-gray-200">
					<p className="text-green-500 font-extrabold text-4xl text-center">¡Compra completada!</p>
					<h3 className="text-center my-3 text-2xl font-bold">Pago realizado con exito</h3>
					<div className="grid grid-cols-3 mt-7 gap-5">
						<div className="col-span-1 flex flex-col items-center border-2 border-gray-200 rounded-lg shadow-lg py-5 px-7 h-fit">
							<h3 className="font-bold text-xl">Facturación</h3>
							<div className="grid grid-cols-2 gap-2 mt-5 w-full">
								<h3>Costo productos</h3>
								<p className="text-right">$ {totalPriceProducts}</p>
								<h3>Costos de envío</h3>
								<p className="text-right">$ {shippingCost}</p>
								<h3 className="font-extrabold">Total</h3>
								<p className="font-extrabold text-right">$ {totalPricePurchase}</p>
							</div>
							<h3 className="font-bold text-xl mt-10">Método de pago</h3>
							<img className="w-52 mt-5" src={logoPaypal} alt="logoPaypal" />
						</div>
						<div className="col-span-1 flex flex-col items-center border-2 border-gray-200 rounded-lg shadow-lg py-5 px-7 h-fit">
							<h3 className="font-bold text-xl">Información de envío</h3>
							<div className="grid grid-cols-2 gap-2 mt-5 w-full">
								<h3 className="font-bold">Nombre</h3>
								<p className="text-right">{formData.name}</p>
								<h3 className="font-bold">Ciudad</h3>
								<p className="text-right">{formData.city}</p>
								<h3 className="font-bold">Dirección</h3>
								<p className="text-right">{formData.address}</p>
							</div>
							<h3 className="font-bold text-xl mt-10">Estado entrega</h3>
							<div className="grid grid-cols-2 gap-2 mt-5 w-full items-center">
								<h3 className="font-bold">Tiempo entrega</h3>
								<p className="text-right">48 horas</p>
								<h3 className="font-bold">Estado actual</h3>
								<p className="text-right">Preparación</p>
							</div>
						</div>
						<div className="col-span-1 flex flex-col items-center border-2 border-gray-200 rounded-lg shadow-lg py-5 px-7 h-fit">
							<h3 className="font-bold text-xl">Resumen de productos</h3>
							{cartConfirmation.map((product) => (
								<ConfirmationProduct product={product} key={product.productId} />
							))}
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<button
						className="py-3 px-20 mt-5 bg-blue-700 hover:bg-sky-500 transition text-white rounded-lg font-bold"
						onClick={() => finishPayment()}
					>
						Finalizar
					</button>
				</div>
			</div>
			<div className="bg-white shadow-lg shrink-0 mt-auto">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default CheckoutConfirmation
