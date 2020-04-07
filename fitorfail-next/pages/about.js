import Layout from "../components/Layout";
import { Container } from "reactstrap";
import styled, { css } from "styled-components";
import Link from "next/link";


const StyledContainment = styled(Container)`
	text-align: left;
	background-color: #b1a7b9;
	border: solid 2px;
	width: 700px;
	margin-bottom: 30px;
`;
const Headers = styled.body`
text-align: center;
background-COlor: hsl(189, 78%, 39%);
font-size: 5rem;
color: white;
font-weight: 900;
text-shadow: 2px 2px gray;
`;
const H1s = styled.h1 `
	text-align: left;
	color: black;
	font-size: 2rem;
	font-weight: 500;
`

const Subtitle = styled.p`
	font-size: 1.25rem;
	font-weight: 600;
	color: white;
	font-style: italic;
	text-align: left;
	${(props) =>
		props.secondary &&
		css`
			font-size: 1rem;
		`}
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
	font-weight: 600;
	margin: 0.5rem 1rem;
	padding: 0.5rem 0;
	&:hover {
		background-color:hsl(189, 78%, 39%) ;
		transition: 500ms;
	}

	${(props) =>
		props.secondary &&
		css`
			background-color: hsl(189, 78%, 39%);
			color: white;
			font-weight: 600;
			&:hover {
				background-color: hsl(0, 75%, 60%);
			}
		`}
`;

const about = () => {
	return (
		<Layout title="About">
			<body style={{backgroundColor: "hsl(189, 78%, 39%)"}}>
				<Headers>About Us:</Headers>
					<StyledContainment>
						<Container>
							<H1s>Company:</H1s>
							<Subtitle>Fitness-Gurus Incorporated</Subtitle>
							<H1s>Mission:</H1s>
							<Subtitle>Fit-or-Fail is the newest trivia game for Everyone! It's goal is to spread fitness awareness 
								to the world and especially to younger generations. With this goal in mind, Fit-or-Fail has 
								dedicated it's questions to the world of fitness. 
							</Subtitle>
							<H1s>Founders:</H1s>
							<Subtitle>
								<ul>
									<li>Christian Saul</li>
									<li>Travis Scott</li>
									<li>Mkafui Dzeze</li>
									<li>Adamma Neumann</li>
									<li>Joshua Shevitz</li>
								</ul>
							</Subtitle> 
							<H1s>Location:</H1s>
							<Subtitle>Address: 7800 York Road Towson Md, 21252</Subtitle>  
							<img
							src="/assets/images/Towson.jpg"
							alt="Fit or Fail logo"
							style={{
								height: "300px", 
								marginRight: "50rem",
								border: "1px solid black"
							}}/>
							<ButtonContainer>
								<Link href="Index.js">
									<StyledButton>Home</StyledButton>
								</Link>
								<Link href="/register">
									<StyledButton secondary>Register</StyledButton>
								</Link>
							</ButtonContainer>	
						</Container>
					</StyledContainment>
			</body>
		</Layout>
	);
};

export default about;
