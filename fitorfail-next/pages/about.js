import Layout from "../components/Layout";
import { Container } from "reactstrap";
import styled, { css } from "styled-components";
import Link from "next/link";

const StyledContainer = styled(Container)`
	display:flex;
	text-align: left;
	background-color: #fafafa;
	border: solid 2px;
	width: 700px;
	margin-bottom: 30px;
	padding: 1.5rem;
	font-size: 1rem;
	@media screen and (max-width: 50rem) {
		width: 80vw;
	}
`;

const Headers = styled.h1`
	text-align: center;
	font-size: 5rem;
	color: white;
	font-weight: 900;
	text-shadow: 2px 2px gray;
	@media screen and (max-width: 50rem) {
		font-size: 3rem;
	}
`;

const Title = styled.h1`
	text-align: left;
	color: black;
	font-size: 2rem;
	font-weight: 500;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-basis: 400px;

`;
const ImageMod =styled.img`
height: 250px;
border: 1px solid black;
@media screen and (max-width: 50rem) {
width: 60vw;
}
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
		background-color: hsl(189, 78%, 39%);
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

const About = (props) => {
	return (
		<Layout title="About" color="#FFA500">
			<Headers>About Us:</Headers>
				<StyledContainer>
					<Container>
						<Title>Company:</Title>
						<p>Fitness Gurus Incorporated</p>
						<Title>Mission:</Title>
						<p>
							Fit or Fail is the newest trivia game for everyone! Its goal is to
							spread fitness awareness to the world and especially to the younger
							generations. With this goal in mind, Fit or Fail has dedicated its
							questions to the world of fitness.
						</p>
						<Title>Founders:</Title>
						<p>
							<ul>
								<li>Christian Sauls</li>
								<li>Travis Scott</li>
								<li>Makafui Dzeze</li>
								<li>Adamma Neumann</li>
								<li>Joshua Shevitz</li>
							</ul>
						</p>
						<Title>Location:</Title>
						<p>Address: 7800 York Road, Towson, MD 21252</p>
						<ImageMod
							src="/assets/images/Towson.jpg"
						/>
						<ButtonContainer>
							<Link href="/">
								<StyledButton>Home</StyledButton>
							</Link>
						</ButtonContainer>
					</Container>
			</StyledContainer>
		</Layout>
	);
};

export default About;
