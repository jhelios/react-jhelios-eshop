import React, { useContext, useEffect } from "react"
import Footer from "../components/Footer"
import logoPaypal from "../assets/logoPaypal.png"
import { ProductContext } from "../contexts/ProductContext"
import { useNavigate } from "react-router-dom"

function ProductDetail() {
	const {
		totalPriceProducts,
		shippingCost,
		setShippingCost,
		formData,
		setFormData,
		totalPricePurchase,
		setTotalPricePurchase,
		loadingTotalPriceProducts,
	} = useContext(ProductContext)

	const navigation = useNavigate()

	useEffect(() => {
		if (totalPriceProducts <= 0 && loadingTotalPriceProducts) {
			alert("No tienes productos en el carrito")
			navigation("/")
		}
		setShippingCost(3)
		setTotalPricePurchase(Math.round((totalPriceProducts + shippingCost) * 100) / 100)
	}, [totalPriceProducts])

	const handleChange = (event) => {
		let { name, value } = event.target
		if (formData[name] == "on") {
			value = "off"
		}
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		navigation("/make-payment")
	}

	return (
		<div className="flex flex-col h-screen">
			<div className="container mx-auto max-w-5xl">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-wrap items-center justify-center gap-4">
						<div className="mt-4 w-[795px] bg-white shadow-lg rounded-lg border-2 border-gray-200 px-10 py-8">
							<h3 className="text-center text-2xl font-bold">Información de envío</h3>
							<div className="grid grid-cols-2 gap-10 mt-8">
								<div className="col-span-1">
									<div className="grid grid-cols-8 items-center">
										<label className="col-span-2" htmlFor="name">
											Nombre:
										</label>
										<input
											className="col-span-6 border border-gray-300 bg-gray-100 rounded shadow-lg"
											type="text"
											name="name"
											id="name"
											placeholder="Kari Rey"
											value={formData.name}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="grid grid-cols-8 items-center mt-5">
										<label className="col-span-2" htmlFor="address">
											Dirección:
										</label>
										<input
											className="col-span-6 border border-gray-300 bg-gray-100 rounded shadow-lg"
											type="text"
											name="address"
											id="address"
											placeholder="Carrera 123 A"
											value={formData.address}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="col-span-1">
									<div className="grid grid-cols-8 items-center">
										<label className="col-span-2" htmlFor="email">
											Email:
										</label>
										<input
											className="col-span-6 border border-gray-300 bg-gray-100 rounded shadow-lg"
											type="email"
											name="email"
											id="email"
											placeholder="email@mail.com"
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="grid grid-cols-8 items-center mt-7">
										<label className="col-span-2" htmlFor="city">
											Ciudad:
										</label>
										<input
											className="col-span-6 border border-gray-300 bg-gray-100 rounded shadow-lg"
											type="text"
											name="city"
											id="city"
											placeholder="Bogotá"
											value={formData.city}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="w-[390px] bg-white shadow-lg rounded-lg border-2 border-gray-200 flex flex-col px-10 py-8">
							<h3 className="text-center text-2xl font-bold">Metodo de pago</h3>
							<div className="flex items-center justify-center mt-7 mb-3">
								<input
									className="rounded-full"
									type="checkbox"
									name="paypalMethod"
									id="paypalMethod"
									onChange={handleChange}
									required
								/>
								<label htmlFor="paypalMethod">
									<img className="w-52" src={logoPaypal} alt="logoPaypal" />
								</label>
							</div>
							<p className="text-gray-400 my-3 text-center text-sm">* Próximamente más opciones de pago</p>
						</div>
						<div className="w-[390px] bg-white shadow-lg rounded-lg border-2 border-gray-200 flex flex-col px-10 py-8">
							<h3 className="text-center text-2xl font-bold">Resumen</h3>
							<div className="grid grid-cols-2 gap-2 mt-7 mb-6">
								<h3>Costo productos</h3>
								<p className="text-right">{totalPriceProducts}</p>
								<h3>Costos de envío</h3>
								<p className="text-right">{shippingCost}</p>
								<h3 className="font-bold">Total</h3>
								<p className="font-bold text-right">{totalPricePurchase}</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center w-full mt-7 mb-7">
						<button className="py-3 px-20 bg-blue-700 hover:bg-sky-500 transition text-white rounded-lg font-bold">
							Continuar
						</button>
					</div>
				</form>
			</div>
			<div className="bg-white shadow-lg shrink-0 mt-auto">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail
