import React from "react"
import { Carousel } from "flowbite-react"
import slide1 from "../assets/carousel/slide1.webp"
import slide2 from "../assets/carousel/slide2.webp"
import slide3 from "../assets/carousel/slide3.webp"

function CarouselMain() {
	const slideList = [slide1, slide2, slide3]

	return (
		<div className="h-[242px] 2xl:h-[272px]">
			<Carousel slideInterval={4000} className="shadow-lg">
				{slideList.map((slide, index) => (
					<img src={slide} alt={`slide${index}`} key={index} />
				))}
			</Carousel>
		</div>
	)
}

export default CarouselMain
