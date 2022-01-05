// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getSession } from "next-auth/react";

export default function handler(req, res) {
	return new Promise(async (resolve, reject) => {
		const session = await getSession({ req });
		const email = req?.headers?.authorization?.slice(7);
		if (email === session?.user?.email) {
			const docRef = doc(db, "users", email);
			const docSnap = await getDoc(docRef).catch(() => res.status(500));
			try {
				if (docSnap?.exists()) {
					res.status(200).json({ userDoc: docSnap.data() });
					resolve();
				} else {
					res.status(500).json({ error: "User not found" });
					resolve();
				}
			} catch (e) {
				res.status(500).json({ error: e });
				resolve();
			}
		} else {
			res.status(400).json({ error: "Unauthorized" });
			resolve();
		}
	});
}
