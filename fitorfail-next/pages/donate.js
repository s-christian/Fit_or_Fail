/* Resources:
 * https://stripe.com/docs/payments/accept-a-payment#web
 */

// This donation implementation is using Stripe as our payment provider.
// This currently uses hard-coded false user and payment information with test API keys.
// Nothing is "real". But, I believe this works to demonstrate our ability to handle donations.

// Try donating with the following Stripe test card numbers (put something random for the other fields):
// - 4242424242424242
// - 4000002500003155
// - 4000000000009995

// "All tests completed" for all three test card numbers; verified working.
// Check the resource link above, step 5.

import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Alert, Button, Spinner } from "reactstrap";
import styled from "styled-components";

const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: "#32325d",
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: "antialiased",
			fontSize: "16px",
			"::placeholder": {
				color: "#aab7c4"
			}
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a"
		}
	}
};

// For some reason the default styles aren't being automatically applied to the Stripe CardElement, so I have to specify them myself
const StyleProvider = styled.div`
	.StripeElement {
		height: 40px;
		padding: 10px 12px;
		width: 100%;
		color: #32325d;
		background-color: white;
		border: 1px solid transparent;
		border-radius: 4px;

		box-shadow: 0 1px 3px 0 #e6ebf1;
		-webkit-transition: box-shadow 150ms ease;
		transition: box-shadow 150ms ease;
	}

	.StripeElement--focus {
		box-shadow: 0 1px 3px 0 #cfd7df;
	}

	.StripeElement--invalid {
		border-color: #fa755a;
	}

	.StripeElement--webkit-autofill {
		background-color: #fefde5 !important;
	}
`;

const CardSection = () => (
	<StyleProvider>
		<CardElement options={CARD_ELEMENT_OPTIONS} />
	</StyleProvider>
);

const FlexWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DonateBox = styled.div`
	background-color: white;
	border: 2px solid hsl(206, 12%, 72%);
	border-radius: 3px;
	padding: 5rem;
	width: 700px;

	@media (max-width: 600px) {
		padding: 5rem 1rem;
		border-radius: 0;
		border-left: 0;
		border-right: 0;
	}
`;

const Title = styled.div`
	text-align: center;
`;

const Donate = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [paymentSuccessful, setPaymentSuccessful] = useState(false);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`${process.env.BASE_URL}/api/stripe/secret`);
			if (data.client_secret) {
				setClientSecret(data.client_secret);
				// Call stripe.confirmCardPayment() with the client secret.
			} else console.error("Stripe API is misbehaving");
		})();
	}, []);

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		setProcessing(true);
		setErrorMessage(null);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: "Jenny Rosen"
				}
			}
		});

		if (result.error) {
			// Show error to your customer (e.g., insufficient funds)
			setErrorMessage(result.error.message);
		} else {
			// The payment has been processed!
			if (result.paymentIntent.status === "succeeded") {
				setErrorMessage(null);
				setPaymentSuccessful(true);
				// There's a risk of the customer closing the window before callback
				// execution. Set up a webhook or plugin to listen for the
				// payment_intent.succeeded event that handles any business critical
				// post-payment actions.
			}
		}
		setProcessing(false);
	};

	return (
		<Layout title="Donate" color="lightblue">
			<FlexWrapper>
				<DonateBox>
					<Title>
						<h2>Please consider donating $10</h2>
						<h6>All proceeds go towards educating teens to make healthy decisions.</h6>
					</Title>
					<form onSubmit={handleSubmit} className="mt-3">
						<CardSection />
						<Button
							outline
							color="primary"
							size="lg"
							block
							className="mt-2"
							disabled={!stripe || paymentSuccessful}
						>
							{!processing ? "Donate" : <Spinner color="secondary" />}
						</Button>
					</form>
					{errorMessage && (
						<Alert color="danger" className="mt-1 text-center">
							{errorMessage}
						</Alert>
					)}
					{paymentSuccessful && (
						<Alert color="success" className="mt-1 text-center">
							Payment successful. Thank you!
						</Alert>
					)}
				</DonateBox>
			</FlexWrapper>
		</Layout>
	);
};

export default Donate;
