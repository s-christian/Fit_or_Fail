/* Resources:
 * https://www.youtube.com/watch?v=XHPL-rX9m-Q
 * https://github.com/axios/axios#handling-errors
 */

import Layout from "../components/Layout";
import Link from "next/link";
import { Container, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Router from "next/router";

// IDEAS:
// Not sure how this will actually end up looking on a phone. Adjust accordingly.
// Make form pop in from the bottom of the page, for extra fancy points.
// If mobile devices have significantly less vertical space, just vertically center the form instead of giving it a top margin.
const Wrapper = styled.div`
	flex: 1;

	@media screen and (max-width: 600px) {
		padding: 1rem;
		display: flex;
		align-items: center;
	}
`;

const StyledContainer = styled(Container)`
	font-size: 1.25rem;
	padding: 4rem 2rem;
	max-width: 550px;
	background-color: white;
	border-radius: 3px;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);
	margin-top: 10vh;

	& #formTop {
		margin-top: 1rem;
	}

	& #registerRedirect {
		margin-top: 2rem;
	}

	// Make the box slimmer and center it on small screens (phones)
	@media screen and (max-width: 600px) {
		font-size: 1rem;
		padding: 2rem 2rem;
		margin-top: 0;
		width: 100%;

		& #formTop {
			margin-top: 0;
		}
	}
`;

const StyledAlert = styled(Alert)`
	// If there is no message to display, hide the alert
	display: ${(props) => (props.message ? "inline-block" : "none")};
	width: 100%;
	text-align: center;
	margin-top: 1rem;
	margin-bottom: 1rem;

	@media screen and (max-width: 600px) {
		margin: 0;
	}
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
	const textInput = useRef(null);

	useEffect(() => {
		if (!message && Router.query.redirect) {
			setMessage("Please log in");
			setError(true);
		}
	});

	function handleSubmit(event) {
		// Necessary to prevent default HTML form submission
		event.preventDefault();

		setIsSubmitting(true);

		// For below, a "response" always contains "data", "status", "statusText", "headers", "config", and "request".
		axios
			.post("/login", {
				usernameOrEmail,
				password
			})
			.then((response) => {
				setError(false);
				//setUserData(response.data.user); // Store User data returned from API call to UserContext
				// We don't do the above because it's strange to have the "Log out" button pop up immediately after pressing "login",
				// and the page we're redirecting to will set the userData itself anyway
				setMessage("Logged in!");
				setTimeout(() => {
					// Redirect to specified route in the query string. Or, just their userpage if nothing is specified.
					// We don't use Router.push() here because we need a "hard" loading of the page,
					// rather than immediately pulling the content like the Next.js Router does.
					// Otherwise, anybody could put in their own redirect link and the page would be served without authorization!
					// Router.push() is okay for the register page since it's hardcoded to only ever redirect to the newly-registered User's userpage.
					window.location.href = Router.query.redirect
						? Router.query.redirect
						: `/users/${response.data.user.username}`;
				}, 1000);
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx (ex: 400 is likely in our case)
					setError(true);
					setMessage(error.response.data.error);
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
			<Wrapper>
				<StyledContainer>
					<Form className="login-form" onSubmit={handleSubmit}>
						<h2 className="text-center">Log in</h2>
						<StyledAlert message={message} color={error ? "danger" : "success"}>
							{message}
						</StyledAlert>
						<FormGroup id="formTop">
							<Label for="usernameOrEmail">Username or Email</Label>
							{/* Must use innerRef because <input> is underneath the reactstrap <Input> */}
							{/* This is used for autofocusing to the usernameOrEmail field after a failed login. See its use in handleSubmit(). */}
							<Input
								type="text"
								innerRef={textInput}
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
						<div id="registerRedirect" className="text-center">
							Don't have an account yet?
							<br />
							<Link href="/register">
								<a style={{ textDecoration: "underline" }}>Create one!</a>
							</Link>
						</div>
					</Form>
				</StyledContainer>
			</Wrapper>
		</Layout>
	);
};

export default Login;
