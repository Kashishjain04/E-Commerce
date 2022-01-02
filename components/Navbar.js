import Link from "next/link";
import CartIcon from "@heroicons/react/solid/ShoppingCartIcon";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import UserIcon from "@heroicons/react/solid/UserCircleIcon";
import SparklesIcon from "@heroicons/react/outline/SparklesIcon";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart, selectCart, selectCartSize } from "../redux/slices/cartSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
	const dispatch = useDispatch(),
		cart = useSelector(selectCart),
		cartSize = useSelector(selectCartSize),
		{ data } = useSession();

	useEffect(() => {
		if (data?.user) {
			fetch("/api/auth/userDoc", {
				method: "GET",
				headers: {
					Authorization: "Email: " + data?.user?.email,
				},
			})
				.then((res) => res.json())
				.then((res) => dispatch(initializeCart(res?.userDoc?.cart || [])))
				.catch((err) => console.log(err));
		}
	}, [data]);

	return (
		<div className="z-10 bg-blue-600 w-full fixed top-0 px-4 sm:px-8 py-4 flex items-center space-x-4 justify-between shadow-xl h-16">
			<Link href="/">
				<img
					src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
					alt="logo"
					className="h-5 cursor-pointer"
				/>
			</Link>
			<div className="hidden sm:flex px-4 py-2 bg-white rounded-md max-w-lg flex-1 space-x-1">
				<input
					type="text"
					placeholder="Search for products, brands and more"
					className="flex-1 outline-none"
				/>
				<SearchIcon className="w-6 text-blue-600 cursor-pointer" />
			</div>
			<div className="flex space-x-4">
				<Link href="/cart">
					<button className="flex items-center text-white space-x-4 group">
						<div className="relative w-6">
							<p className="bg-yellow-400 text-black font-bold rounded-full text-xs absolute w-5 h-5 grid place-items-center -top-2 -right-4">
								{cartSize || 0}
							</p>
							<CartIcon className="w-8" />
						</div>
						<p className="group-hover:underline">Cart</p>
					</button>
				</Link>
				{!data?.user ? (
					<button
						onClick={() => signIn().catch((res) => console.log(res))}
						className="px-4 py-2 rounded-md bg-white text-blue-600 font-bold hover:underline"
					>
						Login
					</button>
				) : (
					<button onClick={() => signOut().catch((res) => console.log(res))}>
						<div className="h-12 p-0.5 rounded-full border-[3px] border-white relative">
							<SparklesIcon className="bg-yellow-400 rounded-full p-0.5 w-5 h-5 absolute -top-1.5 -right-1.5" />
							{data?.user?.image ? (
								<img
									className="h-full w-full object-contain bg-white rounded-full"
									src={data?.user?.image}
									alt="profile-pic"
								/>
							) : (
								<UserIcon className="w-full h-full text-white" />
							)}
						</div>
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
