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
	background-color: hsl(0, 75%, 60%);
	color: white;
	border: 2px solid hsl(0, 0%, 17%);
	font-weight: 700;
	border-radius: 3px;

	&:hover {
		background-color: hsl(0, 91%, 83%);
		transition: 300ms;
	}
	&:active {
		background-color: hsla(108, 52%, 56%);
	}
`;

const Index = () => {
	return (
		<Layout title="Register" color="hsla(108, 52%, 56%)">
			<StyledContainer>
				<Form className="login-form">
					<h2 className="text-center">Register</h2>
					<FormGroup>
						<Label>Username</Label>
						<Input type="text" placeholder="FitMaster27" />
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input type="email" placeholder="YourEmail@email.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input type="password" placeholder="Password" />
					</FormGroup>
					<FormGroup>
						<Label>Confirm Password</Label>
						<Input type="password" placeholder="Retype your password" />
					</FormGroup>
					<StyledButton>Create account</StyledButton>
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

export default Index;
