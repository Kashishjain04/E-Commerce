import stripeConstructor from "stripe";
const stripe = stripeConstructor(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	const { items, email } = JSON.parse(req.body);
	const lineItems = items.map((item) => ({
		description: item.description,
		quantity: item.count,
		price_data: {
			currency: "inr",
			unit_amount: item.price * 75 * 100,
			product_data: {
				name: item.title,
				images: [item.image],
			},
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: [
			"shr_1ItzlhSFCVsTCdL9AEw47c8X",
			// "shr_1ItzkzSFCVsTCdL9c6N1V6U4",
			// "shr_1ItzmCSFCVsTCdL9EeoeHzna",
		],
		shipping_address_collection: {
			allowed_countries: ["IN"],
		},
		line_items: lineItems,
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/success`,
		cancel_url: `${process.env.CLIENT_URL}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});
	return res.status(200).json({ id: session.id });
}
