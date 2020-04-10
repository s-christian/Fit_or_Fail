/* Resources:
 * https://www.youtube.com/watch?v=XHPL-rX9m-Q
 * https://github.com/axios/axios#handling-errors
 */

import Layout from "../components/Layout";
import Link from "next/link";
import { Container, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";

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
	margin-top: 0;
	margin-bottom: 0;
`;

const StyledButton = styled.button`
	width: 100%;
	padding: 0.5rem 0;
	background-color: hsl(0, 75%, 60%);
	color: white;
	border: 2px solid hsl(0, 0%, 17%);
	font-weight: 700;
	border-radius: 3px;
	margin-top: 1rem;

	&:hover {
		background-color: hsl(0, 91%, 83%);
		transition: 300ms;
	}
	&:active {
		background-color: hsla(108, 52%, 56%);
	}
`;

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [accountType, setAccountType] = useState("user");

	const [messages, setMessages] = useState([]);
	const [error, setError] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const textInput = useRef(null);

	function handleSubmit(event) {
		// Necessary to prevent default HTML form submission
		event.preventDefault();

		setIsSubmitting(true);

		// For below, a "response" always contains "data", "status", "statusText", "headers", "config", and "request".
		axios
			.post("/register", {
				username,
				email,
				password,
				confirmPassword,
				accountType
			})
			.then((response) => {
				setError(false);
				setMessages(["Registered!"]);
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx (ex: 400 is likely in our case)
					setError(true);
					setMessages(error.response.data.error);
					textInput.current.focus();
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
				setUsername("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
			});

		setIsSubmitting(false);
	}

	// Gets passed an "event" which contains the target element (the one that called the function).
	// The target element contains the name and value that we set for it.
	function handleChange({ target }) {
		if (target.name === "username") setUsername(target.value);
		else if (target.name === "email") setEmail(target.value);
		else if (target.name === "password") setPassword(target.value);
		else if (target.name === "confirmPassword") setConfirmPassword(target.value);
		else console.error("Error changing register values");
	}

	return (
		<Layout title="Register" color="hsla(108, 52%, 56%)">
			<StyledContainer>
				<Form className="login-form" onSubmit={handleSubmit}>
					<h2 className="text-center" style={{ marginBottom: "1rem" }}>
						Register
					</h2>
					{/* Generates alerts based on errors or a successful registration */}
					{messages.map((message) => {
						return (
							<StyledAlert
								key={message}
								message={message}
								color={error ? "danger" : "success"}
							>
								{message}
							</StyledAlert>
						);
					})}
					<FormGroup style={{ marginTop: "1rem" }}>
						<Label for="username">Username</Label>
						<Input
							type="text"
							innerRef={textInput}
							id="username"
							name="username"
							placeholder="FitMaster27"
							onChange={handleChange}
							value={username}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							id="email"
							name="email"
							placeholder="YourEmail@email.com"
							onChange={handleChange}
							value={email}
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
					<FormGroup>
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Retype your password"
							onChange={handleChange}
							value={confirmPassword}
						/>
					</FormGroup>
					<StyledButton type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Please wait..." : "Register"}
					</StyledButton>
					<div className="text-center mt-5">
						Already have an account?{" "}
						<Link href="/login">
							<a style={{ textDecoration: "underline" }}>Log in!</a>
						</Link>
					</div>
				</Form>
			</StyledContainer>
		</Layout>
	);
};

export default Register;
