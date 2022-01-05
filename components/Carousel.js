import { useEffect, useState } from "react";
import carouselData from "../data/carousel.json";
const Carousel = () => {
	const [translate, setTranslate] = useState(0);
	useEffect(() => {
		const int = setInterval(() => {
			const container = document.getElementById("carouselContainer");
			setTranslate((prev) => {
				container.style.transform = `translateX(-${prev}px)`;
				return (prev + container.clientWidth) % (container.clientWidth * carouselData.length);
			});
		}, 2000);
		return () => clearInterval(int);
	}, []);
	return (
		<div className="hidden md:block m-1 pt-1 overflow-x-hidden">
			<div id="carouselContainer" className={`flex transition-transform duration-300`}>
				{carouselData.map((item) => (
					<img key={item.id} src={item.src} className="w-full" alt="carousel-slide" />
				))}
			</div>
		</div>
	);
};

export default Carousel;
