import Layout from "../../components/Layout";
import Link from "next/link";
import styled, { css, keyframes } from "styled-components";
import { Spinner } from "reactstrap";

const GameHeader = styled.h1`
	text-align: center;
	color: white;
	font-size: 3rem;
	font-weight: 700;
	text-shadow: 4px 4px gray;
`;

const ButtonBox = styled.div`
	align-items: center;
	display: grid;
	justify-content: center;
	margin-top: 5rem;
`;

const ButtonDesign = styled.button`
	border: 2px solid black;
	background-color: #0BC71D;
	color: white;
	font-size: 32px;
	width: 17rem;
	margin: 1rem 1.5rem;
	padding: 1rem 1rem;
	&:hover{
		background-color:#57E530;
		transition: 200ms;
	}
	${(props) =>
		props.secondary &&
		css`
			background-color: #F03004;
			font-size: 32px;
			&:hover{
				background-color: #D8370F;
				transition: 200ms;
			}
		`}
`;

const Question1 = styled.h2`
text-align: center;
color: white;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;
const Question2 = styled.h2`
text-align: center;
color: black;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;
const Question3 = styled.h2`
text-align: center;
color: white;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;
const Question4 = styled.h2`
text-align: center;
color: black;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;
const Question5 = styled.h2`
text-align: center;
color: white;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;


const Image = styled.h2`
text-align: center;
color: white;
font-size: 4rem;
font-weight: 700;
text-shadow: 2px 2px gray;
`;


const ProfilePicture = styled.img`
	height: 250px;
	width: 250px;
	border-radius: 50%;
	margin:25px 50px 50px 650px;
	border: 1px solid black;
	-webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;

}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }


	${(props) =>
		props.notFound &&
		css`
			border: 1px solid white;
		`}

	
		
`;







function SoloGame() {
	return (

		<Layout title="Game · solo" color = "#43D61A">
			<GameHeader>Solo Mode</GameHeader>
			<ProfilePicture notFound src="/assets/images/fitorfail_logo.png" />
			<Question1>Muscles weigh more than fat?</Question1>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>True</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>False</ButtonDesign></a>
				</Link>
				
			</p>
			</ButtonBox>
			<Question2>You should warm-up before excercising?</Question2>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>True</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>False</ButtonDesign></a>
				</Link>
				
			</p>
			</ButtonBox>
			<Question3>The more you sweat during a workout, the more fat the body is burning?</Question3>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>True</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>False</ButtonDesign></a>
				</Link>
				
			</p>
			</ButtonBox>
			<Question4>Crunches and sit-ups are the best way to lose belly fat?</Question4>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>True</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>False</ButtonDesign></a>
				</Link>
				
			</p>
			</ButtonBox>
			<Question5>Does muscle burn calories even when the body is at rest?</Question5>
			<ButtonBox>
			<p>
				<Link href="/game/solo">
					<a href ="/"><ButtonDesign>True</ButtonDesign></a>
				</Link>{" "}
				<Link href="/game/online">
					<a href="/"><ButtonDesign secondary>False</ButtonDesign></a>
				</Link>
				
			</p>
			</ButtonBox>
		</Layout>
	);
}

export default SoloGame;
