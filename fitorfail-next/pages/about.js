import Layout from "../components/Layout";
import { Container } from "reactstrap";
import styled, { css } from "styled-components";
import Link from "next/link";

const PageCenter = styled(Container)`
	display: center; // This isn't even valid CSS... Use flex or something to center it.
`;

const StyledContainer = styled(Container)`
	text-align: left;
	background-color: #FAFAFA;
	border: solid 2px;
	width: 700px;
	margin-bottom: 30px;
	padding: 1.5rem; 
	font-size: 1rem
`;

const Headers = styled.h1`
	// Dear Lord, why is this a BODY????? THIS is what's affecting everything in the page! LOL. Changed to an h1.
	text-align: center;
	// Fixed typo (background-COlor), but also just removed it entirely because there's no need for a background-color here
	font-size: 5rem;
	color: white;
	font-weight: 900;
	text-shadow: 2px 2px gray;
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


const About = () => {
	return (
		<Layout title="About" color="#FFA500">
			<PageCenter>
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
						<img
							src="/assets/images/Towson.jpg"
							style={{
								height: "250px",
								border: "1px solid black"
							}}
						/>
						<ButtonContainer>
							<Link href="/">
								<StyledButton>Home</StyledButton>
							</Link>
						</ButtonContainer>
					</Container>
				</StyledContainer>
			</PageCenter>
		</Layout>
	);
};

export default About;
