import Layout from "../components/Layout";
import { Container, Jumbotron } from "reactstrap";
import styled, { css } from "styled-components";
import Link from "next/link";

const Index = () => {
	const StyledJumbo = styled(Jumbotron)`
		text-align: center;
		background-color: hsl(189, 78%, 39%);
	`;

	const Title = styled.h1`
		font-size: 5rem;
		color: white;
		font-weight: 900;
		text-shadow: 2px 2px gray;
	`;

	const Subtitle = styled.p`
		font-size: 1.25rem;
		font-weight: 600;
		color: white;
		font-style: italic;
	`;

	const ButtonContainer = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-basis: 400px;
	`;

	const StyledButton = styled.button`
		width: 11rem;
		background-color: hsl(0, 75%, 60%);
		border-radius: 3px;
		border: 2px solid hsl(188, 54%, 82%);
		color: white;
		font-weight: 900;
		margin: 0.5rem 1rem;
		padding: 0.5rem 0;
		&:hover {
			background-color: hsl(0, 91%, 83%);
			transition: 500ms;
		}

		${(props) =>
			props.secondary &&
			css`
				background-color: white;
				color: black;
				font-weight: 600;
				&:hover {
					background-color: hsla(108, 52%, 56%);
				}
			`}
	`;

	return (
		<Layout title="Welcome">
			<StyledJumbo fluid>
				<Container fluid="lg">
					<Title>Fit or Fail!</Title>
					<Subtitle>The new revolutionary fitness trivia game</Subtitle>
					<ButtonContainer>
						<Link href="/game">
							<StyledButton>PLAY</StyledButton>
						</Link>
						<Link href="/register">
							<StyledButton secondary>Register</StyledButton>
						</Link>
					</ButtonContainer>
				</Container>
			</StyledJumbo>

			<Link href="/testing">
				<a>Link to testing page</a>
			</Link>
		</Layout>
	);
};

export default Index;
