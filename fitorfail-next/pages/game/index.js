import Layout from "../../components/Layout";
import Link from "next/link";
import styled, { css } from "styled-components";

const GameHeader = styled.h1`
	text-align: center;
	color: white;
	font-size: 5rem;
	font-weight: 900;
	text-shadow: 2px 2px gray;
`;

const ButtonBox = styled.div`
	align-items: center;
	display: grid;
	justify-content: center;
	margin-top: 5rem;
`;

const ButtonDesign = styled.button`
	border: 2px solid gray;
	background-color: #1E90FF;
	color: white;
	font-size: 32px;
	width: 15rem;
	margin: 1rem 1.5rem;
	padding: 1rem 1rem;
	&:hover{
		background-color: #9D50BB;
		transition: 200ms;
	}
	${(props) =>
		props.secondary &&
		css`
			background-color: #9D50BB;
			font-size: 32px;
			&:hover{
				background-color: #1E90FF;
				transition: 200ms;
			}
		`}
`;

const SecondHeader = styled.h2`
text-align: center;
color: white;
font-size: 2rem;
font-weight: 900;
text-shadow: 2px 2px gray;
`;


function Game() {
	// TODO:
	// Figure out how to do CSR to simply display the authenticated user's username at the top of the page (Welcome, <name>!).
	// I don't want the entire page to be SSR just to display the name.
	return (
		<Layout title="Game" color = "#E100FF">
			<GameHeader>Pick Your Gamemode</GameHeader>
			<SecondHeader>Buttons to pick Solo or Online</SecondHeader>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>Solo</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>Online</ButtonDesign></a>
				</Link>
			</p>
			</ButtonBox>
		</Layout>
	);
}

export default Game;
