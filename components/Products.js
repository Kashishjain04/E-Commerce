import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {useSession} from "next-auth/react"
import { addToCart } from "../redux/slices/cartSlice";

const Products = () => {
	const dispatch = useDispatch(),
	{ data } = useSession(),
		[products, setProducts] = useState([]);

	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((json) => setProducts(json))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 bg-gray-200 p-2">
				{products.map((p) => (
					<div
						key={p.id}
						className="hover:shadow-lg p-4 rounded-md bg-white relative flex flex-col items-start"
					>
						<span className="absolute top-0.5 right-2 text-sm italic text-gray-400">{p.category}</span>
						<img src={p.image} alt={p.title} className="w-full aspect-[3/2] object-contain mt-1.5" />
						<p className="line-clamp-1 mt-2 text-lg">{p.title}</p>
						<ReactStars count={5} value={p.rating.rate} edit={false} isHalf={true} size={20} />
						<p className="line-clamp-2 text-sm">{p.description}</p>
						{Math.random() >= 0.5 && (
							<img
								src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
								alt="f-assured"
								className="h-5 my-0.5 mb-2"
							/>
						)}
						<button onClick={() => dispatch(addToCart({product: p, user: data?.user}))} className="mt-auto w-full p-2 bg-blue-600 rounded-md text-white font-bold">
							Add To Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
