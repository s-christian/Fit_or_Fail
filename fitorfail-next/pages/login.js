/* Resources:
 * https://www.youtube.com/watch?v=XHPL-rX9m-Q
 * https://github.com/axios/axios#handling-errors
 */

import Layout from "../components/Layout";
import Link from "next/link";
import { Container, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

// IDEAS:
// Not sure how this will actually end up looking on a phone. Adjust accordingly.
// Make form pop in from the bottom of the page, for extra fancy points.
// If mobile devices have significantly less vertical space, just center the form instead of giving it a top margin.
const StyledContainer = styled(Container)`
	font-size: 1.25rem;
	padding: 4rem 2rem;
	width: 550px !important;
	background-color: white;
	border-radius: 3px;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);
	margin-top: 10vh;

	// Make the box slimmer on small screens (phones)
	@media screen and (max-width: 600px) {
		width: 450px !important;
	}
`;

const StyledAlert = styled(Alert)`
	// If there is no message to display, hide the alert
	display: ${(props) => (props.message ? "inline-block" : "none")};
	width: 100%;
	text-align: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const StyledButton = styled.button`
	width: 100%;
	padding: 0.5rem 0;
	background-color: hsl(112, 57%, 42%);
	color: white;
	border: 2px solid hsl(0, 0%, 17%);
	font-weight: 700;
	border-radius: 3px;
	margin-top: 1rem;

	&:hover {
		background-color: hsla(108, 52%, 56%);
		transition: 300ms;
	}
	&:active {
		background-color: hsl(0, 75%, 60%);
	}
`;

const Login = () => {
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");

	const [message, setMessage] = useState(null);
	const [error, setError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSubmit(event) {
		// Necessary to prevent default HTML form submission
		event.preventDefault();

		setIsSubmitting(true);

		// For below, a "response" always contains "data", "status", "statusText", "headers", "config", and "request".
		axios
			.post("http://localhost:3000/login", {
				usernameOrEmail,
				password
			})
			.then((response) => {
				setError(false);
				setMessage("Logged in!");
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx (ex: 400 is likely in our case)
					setError(true);
					setMessage(error.response.data.error);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
			})
			.finally(() => {
				setUsernameOrEmail("");
				setPassword("");
			});

		setIsSubmitting(false);
	}

	// Gets passed an "event" which contains the target element (the one that called the function).
	// The target element contains the name and value that we set for it.
	function handleChange({ target }) {
		if (target.name === "usernameOrEmail") setUsernameOrEmail(target.value);
		else if (target.name === "password") setPassword(target.value);
		else console.error("Error changing login values");
	}

	return (
		<Layout title="Log in" color="hsl(0, 75%, 60%)">
			<StyledContainer>
				<Form className="login-form" onSubmit={handleSubmit}>
					<h2 className="text-center">Log in</h2>
					<StyledAlert message={message} color={error ? "danger" : "success"}>
						{message}
					</StyledAlert>
					<FormGroup>
						<Label for="usernameOrEmail">Username or Email</Label>
						<Input
							type="text"
							id="usernameOrEmail"
							name="usernameOrEmail"
							placeholder="FitMaster27 / YourEmail@email.com"
							onChange={handleChange}
							value={usernameOrEmail}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							value={password}
						/>
					</FormGroup>
					<StyledButton type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Please wait..." : "Log in"}
					</StyledButton>
					<div className="text-center mt-5">
						Don't have an account?{" "}
						<Link href="/register">
							<a style={{ textDecoration: "underline" }}>Create one!</a>
						</Link>
					</div>
				</Form>
			</StyledContainer>
		</Layout>
	);
};

export default Login;
