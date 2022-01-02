// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function handler(req, res) {
    const email = req?.headers?.authorization?.slice(7);
	const docRef = doc(db, "users", email);
	const docSnap = await getDoc(docRef).catch(() => res.status(500));
	if (docSnap?.exists()) {
		res.status(200).json({ userDoc: docSnap.data() });
	} else {
		res.status(500);
	}
}
