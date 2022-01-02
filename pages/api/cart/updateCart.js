// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function handler(req, res) {
	return new Promise((resolve, reject) => {
		const { cart, user } = JSON.parse(req?.body);
		const docRef = doc(db, "users", user?.email);
		updateDoc(docRef, { cart })
			.then(() => {
				res.status(200).end();
				resolve();
			})
			.catch(() => {
				res.status(500).end();
				resolve();
			});
	});
}
