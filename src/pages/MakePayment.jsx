import React, { useContext } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { ProductContext } from "../contexts/ProductContext"
import logoPaypal from "../assets/logoPaypal.png"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

function MakePayment() {
	const { totalPriceProducts, shippingCost, formData, totalPricePurchase } = useContext(ProductContext)
	const navigation = useNavigate()

	const clientId = "AV4-OMio-v8MLxRXCAhQ3Hm-hkErc1rfw4OmJTwjvI8plRvAF9MJDBvG-9jVtFaNR2lHCY2J-hPjT52C"

	const createOrder = (data, actions) => {
		return actions.order.create({ purchase_units: [{ amount: { value: totalPricePurchase } }] })
	}

	const onApprove = (data, actions) => {
		return actions.order.capture().then(function (details) {
			handlePaymentSuccess(details, data)
		})
	}

	const handlePaymentSuccess = (details, data) => {
		console.log("Pago exitoso", details, data)
		navigation("../checkout/confirmation")
	}

	const handlePaymentError = (error) => {
		console.log("Error de pago", error)
	}

	return (
		<div className="flex flex-col">
			<div className="container mx-auto mt-4 max-w-5xl flex flex-wrap justify-center gap-4 2xl:mb-[378px] mb-[95px]">
				<div className="w-[390px] bg-white shadow-lg rounded-lg border-2 border-gray-200 flex flex-col px-10 py-8">
					<h3 className="text-center text-2xl font-bold">Resumen facturación</h3>
					<div className="grid grid-cols-2 gap-2 mt-7 mb-6">
						<h3>Costo productos</h3>
						<p className="text-right">{totalPriceProducts}</p>
						<h3>Costos de envío</h3>
						<p className="text-right">{shippingCost}</p>
						<h3 className="font-bold">Total</h3>
						<p className="font-bold text-right">{totalPricePurchase}</p>
					</div>
					<div className="flex justify-between items-center mt-3">
						<h3 className="font-bold mb-3">Método de pago</h3>
						<img className="w-40 -mr-4" src={logoPaypal} alt="logoPaypal" />
					</div>
				</div>
				<div className="w-[390px] bg-white shadow-lg rounded-lg border-2 border-gray-200 flex flex-col px-10 py-8">
					<h3 className="text-center text-2xl font-bold">Información de envío</h3>
					<div className="grid grid-cols-2 gap-2 mt-7 mb-6">
						<h3 className="font-bold">Nombre</h3>
						<p className="text-right">{formData.name}</p>
						<h3 className="font-bold">Email</h3>
						<p className="text-right">{formData.email}</p>
						<h3 className="font-bold">Dirección</h3>
						<p className="text-right">{formData.address}</p>
						<h3 className="font-bold">Ciudad</h3>
						<p className="text-right">{formData.city}</p>
					</div>
				</div>
				<PayPalScriptProvider options={{ "client-id": clientId }}>
					<div className="flex flex-col justify-center w-7/12 mt-5">
						<PayPalButtons
							createOrder={createOrder}
							onApprove={onApprove}
							onError={handlePaymentError}
							style={{ layout: "horizontal", color: "blue", label: "pay" }}
							className="w-full"
						/>
					</div>
				</PayPalScriptProvider>
			</div>
			<div className="bg-white shadow-lg shrink-0 mt-auto">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default MakePayment
