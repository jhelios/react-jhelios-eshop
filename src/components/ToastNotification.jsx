import React, { useEffect, useState } from "react"
import { Toast } from "flowbite-react"
import { RiCheckFill, RiCloseFill, RiInformationLine } from "react-icons/ri"

function ToastNotification({ state, message }) {
	const [showToast, setShowToast] = useState(true)

	let icon = <RiCheckFill className="h-5 w-5" />
	let colors = "bg-green-100 text-green-500"

	if (state == "success") {
		icon = <RiCheckFill className="h-5 w-5" />
		colors = "bg-green-100 text-green-500"
	} else if (state == "error") {
		icon = <RiCloseFill className="h-5 w-5" />
		colors = "bg-red-100 text-red-500"
	} else if (state == "info") {
		icon = <RiInformationLine className="h-5 w-5" />
		colors = "bg-blue-100 text-blue-500"
	}

	useEffect(() => {
		setTimeout(() => {
			setShowToast(false)
		}, 3000)
	}, [])

	return (
		<>
			{showToast && (
				<div className="items-center z-30 w-full">
					<Toast className="border-2 shadow-lg w-[240px]">
						<div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors}`}>
							{icon}
						</div>
						<div className="ml-3 text-sm font-normal">{message}</div>
						<Toast.Toggle />
					</Toast>
				</div>
			)}
		</>
	)
}

export default ToastNotification
