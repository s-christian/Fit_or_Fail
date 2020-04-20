/* Resources:
 * https://stripe.com/docs/payments/accept-a-payment#web
 */

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // test secret key

router.get("/secret", async (req, res) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 1000,
		currency: "usd",
		metadata: { integration_check: "accept_a_payment" }
	});
	res.json({ client_secret: paymentIntent.client_secret });
});

module.exports = router;
