import PlusCircleIcon from "@heroicons/react/outline/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/outline/MinusCircleIcon";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import CurrencyFormat from "react-currency-format";
import { calculateBasePrice, calculateINR } from "../utils/currencyConv";

const CartItem = ({ item }) => {
	const dispatch = useDispatch(),
		{ data } = useSession();

	const addHandler = () => {
		dispatch(addToCart({ product: item, user: data.user }));
	};
	const removeHandler = () => {
		dispatch(removeFromCart({ product: item, user: data.user }));
	};
	return (
		<div className="py-4 px-6 border-t flex">
			<div className="flex-[0.25] mr-6 flex items-center">
				<img src={item?.image} alt="product" className="max-h-32 h-auto w-full object-contain" />
			</div>
			<div className="flex-[0.75] flex flex-col">
				<h2 className="text-lg">{item?.title}</h2>
				<p className="font-medium text-gray-400">{item?.category}</p>
				<div className="flex md:items-center my-1 flex-col md:flex-row">
					<CurrencyFormat
						className="text-xl font-bold"
						prefix="₹"
						value={calculateINR(Number(item?.price))}
						thousandSeparator=","
						displayType="text"
						allowNegative={false}
					/>
					<CurrencyFormat
						className="text-sm text-gray-500 line-through md:ml-4 md:mr-2"
						prefix="₹"
						value={calculateBasePrice(Number(item?.price))}
						thousandSeparator=","
						displayType="text"
						allowNegative={false}
					/>
					<p className="text-sm font-bold text-green-700">25% Off</p>
				</div>
				<div className="flex space-x-1 my-1 text-gray-500 mt-auto">
					<button onClick={removeHandler}>
						<MinusCircleIcon className="h-7 cursor-pointer" />
					</button>
					<p className="h-7 w-12 text-center border">{item?.count}</p>
					<button onClick={addHandler}>
						<PlusCircleIcon className="h-7 cursor-pointer" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
