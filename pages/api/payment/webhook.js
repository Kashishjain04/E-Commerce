export const config = {
	api: {
		bodyParser: false,
	},
};

import { buffer } from "micro";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import stripeConstructor from "stripe";
const stripe = stripeConstructor(process.env.STRIPE_SECRET_KEY);

const saveOrderDetails = async (session) => {
	const userDoc = doc(db, "users", session.metadata.email);
	updateDoc(userDoc, {
		cart: [],
		orders: arrayUnion({
			amount: session.amount_total / 100,
			shippingAmount: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			orderId: session.id,
			status: session.status,
			timestamp: new Date(),
		}),
	}).catch((err) => console.log(err));
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		const payload = await buffer(req),
			sig = req.headers["stripe-signature"],
			endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
		let event;
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			return res.status(200).json({ status: "failed" });
		}
		if (event.type === "checkout.session.completed") {
			return await saveOrderDetails(event.data.object)
				.then(() => res.status(200).json({ status: "success" }))
				.catch(() => res.status(200).json({ status: "failed" }));
		} else {
			return res.status(200).json({ status: "failed", message: "unhandled event type" });
		}
	} else res.status(200).json({ status: "failed" });
}
