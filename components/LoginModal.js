import CancelIcon from "@heroicons/react/outline/XIcon";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../redux/slices/utilsSlice";

const LoginModal = () => {
    const dispatch = useDispatch();
    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-20 bg-gray-500 bg-opacity-80 grid place-items-center">
            <div className="mx-2 min-w-[300px] p-10 bg-white rounded-md grid place-items-center relative">
                <button onClick={() => dispatch(closeLoginModal())} className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <CancelIcon className="w-6 h-6 text-gray-400" />
                </button>
                <img className="max-w-[50vw]" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="login-asset" />
                <h1 className="mt-5 sm:mt-7 text-center text-lg sm:text-xl font-semibold sm:font-bold">You Need to Login to Continue!!</h1>
                <button onClick={() => signIn().catch((res) => console.log(res))} className="mt-2 bg-blue-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-md">Login</button>
            </div>
        </div>
    )
}

export default LoginModal
