import Layout from "../components/Layout";
import Link from "next/link";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";

// IDEAS:
// Not sure how this will actually end up looking on a phone. Adjust accordingly.
// Make form pop in from the bottom of the page, for extra fancy points.
// If mobile devices have significantly less vertical space, just center the form instead of giving it a top margin.
const StyledContainer = styled(Container)`
	font-size: 1.25rem;
	padding: 4rem 2rem;
	width: 550px;
	background-color: white;
	border-radius: 3px;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);
	margin-top: 10vh;

	// Make the box slimmer on small screens (phones)
	@media screen and (max-width: 600px) {
		width: 450px;
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

	&:hover {
		background-color: hsla(108, 52%, 56%);
		transition: 300ms;
	}
	&:active {
		background-color: hsl(0, 75%, 60%);
	}
`;

const Login = () => {
	return (
		<Layout title="Log in" color="hsl(0, 75%, 60%)">
			<StyledContainer>
				<Form className="login-form">
					<h2 className="text-center">Log in</h2>
					<FormGroup>
						<Label>Username or Email</Label>
						<Input type="text" placeholder="FitMaster27 / YourEmail@email.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input type="password" placeholder="Password" />
					</FormGroup>
					<StyledButton>Log in</StyledButton>
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
