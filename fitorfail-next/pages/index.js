import Layout from "../components/Layout";
import StyledLink from "../components/StyledLink";
import { Container, Jumbotron } from "reactstrap";
import styled, { css } from "styled-components";
import Link from "next/link";

const StyledJumbo = styled(Jumbotron)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	background-color: hsl(189, 78%, 39%);
	margin-bottom: 0;
	border-bottom: 2px solid white;
	flex-grow: 2;

	${(props) =>
		props.secondary &&
		css`
			background-color: hsl(112, 57%, 42%);
			border-bottom: 0;
			flex-grow: 1;
		`}
`;

const Title = styled.h1`
	font-size: 5rem;
	color: white;
	font-weight: 900;
	text-shadow: 2px 2px gray;

	${(props) =>
		props.secondary &&
		css`
			font-size: 3rem;
			text-shadow: none;
		`}
`;

const Subtitle = styled.p`
	font-size: 1.25rem;
	font-weight: 600;
	color: white;
	font-style: italic;

	${(props) =>
		props.secondary &&
		css`
			font-size: 1rem;
		`}
`;

const ButtonContainer = styled.div`
	margin-top: 3rem;
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
		transition: 300ms;
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

const Index = () => {
	// Trying to add our fitorfail_logo.png behind the main text, but can't figure out how to
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
			<StyledJumbo secondary fluid>
				<Container fluid="lg">
					<Title secondary>Leaderboard</Title>
					<Subtitle secondary>There's gonna be a cool leaderboard, woohoo</Subtitle>
					<StyledLink href="/leaderboard">Leaderboard</StyledLink>
					<StyledLink href="/testing">Link to test page</StyledLink>
				</Container>
			</StyledJumbo>
		</Layout>
	);
};

export default Index;
