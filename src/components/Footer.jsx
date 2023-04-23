import React, { useContext, useEffect } from "react"
import { RiGithubFill, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri"
import { ProductContext } from "../contexts/ProductContext"

function Footer() {
	const { setShowToast } = useContext(ProductContext)

	useEffect(() => {
		setShowToast([])
	}, [])

	return (
		<footer className="bg-white rounded-lg container mx-auto border-gray-200">
			<div className="p-5 flex items-center gap-4 md:items-center justify-center">
				<span className="text-sm text-gray-700 sm:text-center">Hecho con ♥️ desde Colombia 🇨🇴</span>
				<span className="text-sm text-gray-700 sm:text-center flex items-center mx-auto">
					Desarrollado por Jhon Vela 🤓
				</span>
				<ul className="shrink-0 flex flex-wrap gap-5 items-center ml-[80px] text-sm font-medium">
					<li>
						<a href="#">
							<RiLinkedinBoxFill className="text-blue-700" size="2em" />
						</a>
					</li>
					<li>
						<a href="#">
							<RiTwitterFill className="text-sky-500" size="2em" />
						</a>
					</li>
					<li>
						<a href="#">
							<RiGithubFill className="text-gray-700" size="2em" />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
