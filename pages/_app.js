import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import store from "../redux/store";
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<Provider store={store}>
				<Navbar />
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
