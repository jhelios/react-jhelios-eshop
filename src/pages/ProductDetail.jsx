import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import Header from "../components/Header"
import { RiArrowDropLeftLine } from "react-icons/ri"
import Footer from "../components/Footer"
import { Link, useParams } from "react-router-dom"
import { ProductContext } from "../contexts/ProductContext"
import ToastNotification from "../components/ToastNotification"

function ProductDetail() {
	const { getProductByID, addToCart, products, showToast, setShowToast } = useContext(ProductContext)
	const [quantity, setQuantity] = useState(1)
	const { productId } = useParams()
	const [product, setProduct] = useState({})
	const [imgMain, setImgMain] = useState("")

	useEffect(() => {
		setProduct(getProductByID(productId))
	}, [products])

	useLayoutEffect(() => {
		if (product?.images) setImgMain(product.images[0].url)
	}, [product])

	const addProduct = () => {
		addToCart({ productId, quantity, price: product.price, name: product.name, image: product.images[0].url })
		setShowToast([
			...showToast,
			<ToastNotification state={"success"} message={"Producto agregado"} key={showToast.length} />,
		])
	}

	return (
		<div className="flex flex-col">
			<div className="container">
				<div className="absolute right-0 mr-4 mt-4 z-30">{showToast}</div>
			</div>
			<div className="container mx-auto mt-4 max-w-5xl 2xl:mb-[307px] mb-[24px]">
				{product?.images && (
					<div className="grid grid-cols-12 bg-white shadow-lg rounded-lg border-2 border-gray-200">
						<div className="col-span-7">
							<Link className="bg-gray-700/25 rounded-full absolute m-2.5 flex items-center text-white" to={"/"}>
								<RiArrowDropLeftLine size="3.1em" />
							</Link>
							<img
								src={imgMain}
								alt="imgProduct"
								className="rounded-tl-lg rounded-br-lg w-lg w-[595px] h-[398px]"
							/>
							<div className="flex justify-center gap-4 my-3">
								<button onClick={() => setImgMain(product.images[0].url)}>
									<img
										src={product.images[0].url}
										alt="imgProduct"
										className="rounded-xl w-[90px] h-[65px] border-[7px] border-gray-700/10 shadow-lg hover:border-gray-700/20"
									/>
								</button>
								<button
									onClick={() => {
										setImgMain(product.images[1].url)
									}}
								>
									<img
										src={product.images[1].url}
										alt="imgProduct"
										className="rounded-xl w-[90px] h-[65px] border-[7px] border-gray-700/10 shadow-lg hover:border-gray-700/20"
									/>
								</button>
								<button onClick={() => setImgMain(product.images[2].url)}>
									<img
										src={product.images[2].url}
										alt="imgProduct"
										className="rounded-xl w-[90px] h-[65px] border-[7px] border-gray-700/10 shadow-lg hover:border-gray-700/20"
									/>
								</button>
							</div>
						</div>
						<div className="col-span-5 flex flex-col items-center my-5 ml-7 mr-9">
							<h1 className="text-3xl mt-3 mb-1 font-bold">{product.name}</h1>
							<h3 className="text-xl font-extrabold text-blue-700 mb-2">$ {product.price}</h3>
							<p className="my-5 text-gray-700 text-justify mb-auto">{product.description}</p>
							<div className="shrink-0 flex flex-col gap-2 items-center mt-7">
								<h3>Cantidad</h3>
								<div className="flex gap-4 items-center mb-1">
									<button
										className={`bg-gray-100 hover:bg-gray-300 shadow-lg p-1 w-8 rounded-md font-bold ${
											quantity < 2 && "invisible"
										}`}
										onClick={() => setQuantity(quantity - 1)}
									>
										-
									</button>
									<p className="font-extrabold">{quantity}</p>
									<button
										className={`bg-gray-100 hover:bg-gray-300 shadow-lg p-1 w-8 rounded-md font-bold ${
											quantity == 13 && "invisible"
										}`}
										onClick={() => setQuantity(quantity + 1)}
									>
										+
									</button>
								</div>
								<button
									className={`bg-blue-700 w-72 p-3 mb-3 mt-2 shadow-lg text-white font-bold rounded-xl hover:bg-sky-500`}
									onClick={() => addProduct()}
								>
									Agregar al carrito
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="shrink-0 mt-auto bg-white shadow-lg">
				<div className="container mx-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail
