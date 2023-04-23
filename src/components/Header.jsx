import React, { useContext, useEffect, useState } from "react"
import mainLogo from "../assets/mainLogo.png"
import { RiSearchLine, RiShoppingCartLine, RiUser3Line, RiUserAddLine } from "react-icons/ri"
import CartList from "./CartList"
import { Link, useNavigate } from "react-router-dom"
import { ProductContext } from "../contexts/ProductContext"
import ToastNotification from "./ToastNotification"

function Header() {
	const { cart, filterProducts, searchValue, setSearchValue, showToast, setShowToast } =
		useContext(ProductContext)
	const [openCart, setOpenCart] = useState(false)
	const [quantityProducts, setQuantityProducts] = useState(0)
	const navigation = useNavigate()

	useEffect(() => {
		setQuantityProducts(cart.reduce((accu, current) => accu + current.quantity, 0))
	}, [cart])

	useEffect(() => {
		const inputSeach = document.querySelector("#search")
		inputSeach.addEventListener("keypress", (event) => {
			if (event.key == "Enter") {
				searchProduct()
			}
		})
	}, [searchValue])

	const handleSeachValue = (value) => {
		setSearchValue(value.target.value)
	}

	const searchProduct = () => {
		if (searchValue.length > 0) {
			filterProducts(searchValue)
			navigation("/search-product")
		}
	}

	const showNotification = () => {
		setShowToast([
			...showToast,
			<ToastNotification state={"info"} message={"En construcción"} key={showToast.length} />,
		])
	}

	return (
		<>
			<nav className="flex items-center py-5 z-10">
				<div className="mr-5">
					<Link to="/">
						<img className="max-w-[200px]" src={mainLogo} alt="mainLogo" />
					</Link>
				</div>
				<div className="mx-auto w-full px-7 flex items-center">
					<input
						className="border border-gray-300 py-[8.4px] pl-3 pr-14 rounded-lg bg-gray-50 w-full"
						type="text"
						name="search"
						id="search"
						placeholder="Buscar productos"
						value={searchValue}
						onChange={handleSeachValue}
					/>
					<button className="relative -m-[46px] bg-gray-200 rounded-r-lg" onClick={() => searchProduct()}>
						<RiSearchLine className="text-gray-700 my-2.5 mx-3" size="1.3em" />
					</button>
				</div>
				<div className="shrink-0 flex">
					<button
						className="mx-auto px-5 flex gap-2 items-center text-gray-700"
						onClick={() => showNotification()}
					>
						<RiUser3Line size="1.3em" />
						<h3>Ingresar</h3>
					</button>
					<button
						className="mx-auto pl-5 pr-7 flex gap-2 items-center text-gray-700"
						onClick={() => showNotification()}
					>
						<RiUserAddLine size="1.3em" />
						<h3>Registrarse</h3>
					</button>
					<button
						className="flex gap-2 items-center text-gray-700"
						onClick={() => {
							setOpenCart(!openCart)
						}}
					>
						<RiShoppingCartLine size="1.5em" />
						{quantityProducts > 0 && (
							<>
								<p className="absolute text-white -mt-[22px] ml-[10px] font-bold text-sm bg-blue-500 rounded-full py-[1px] px-[7px]">
									{quantityProducts}
								</p>
							</>
						)}
					</button>
				</div>
			</nav>
			{openCart && <CartList setOpenCart={setOpenCart} />}
			<div className="container">
				<div className="absolute right-0 mr-4 mt-4 z-30">{showToast}</div>
			</div>
		</>
	)
}

export default Header
