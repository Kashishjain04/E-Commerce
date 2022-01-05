// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, updateDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import { db } from "../firebase";

export default function handler(req, res) {
	return new Promise(async (resolve, reject) => {
		const session = await getSession({ req });
		const { cart, user } = JSON.parse(req?.body);
		if (user?.email === session?.user?.email) {
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
		} else {
			res.status(400).json({ message: "Unauthorized" });
			resolve();
		}
	});
}
