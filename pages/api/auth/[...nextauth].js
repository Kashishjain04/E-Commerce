import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	// callbacks: {
	// 	async signIn({ user }) {
	// 		try {
	// 			const docRef = doc(db, "users", user.email);
	// 			const docSnap = await getDoc(docRef);
	// 			if (!docSnap.exists()) setDoc(docRef, { ...user, orders: [], cart: [] }, { merge: true });
	// 			return { message: true };
	// 		} catch (error) {
	// 			return { message: false };
	// 		}
	// 	},		
	// },
});
