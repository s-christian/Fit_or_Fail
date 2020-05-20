import Layout from "../../components/Layout";
import { Button } from "reactstrap";
import styled from "styled-components";

const FlexWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const QuestionBox = styled(FlexWrapper)`
	flex-direction: column;
	flex: 0;
	align-items: flex-start;
	box-sizing: border-box;
	padding: 2rem;
	background-color: hsla(0, 0%, 100%, 0.6);
	border: 5px solid black;
	border-radius: 1rem;
	width: 700px;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);

	transition: opacity 500ms ease;
	animation: popOut 1s;

	@keyframes popOut {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	@media screen and (max-width: 750px) {
		width: 100%;
		border-radius: 0;
		border-left: 0;
		border-right: 0;
	}

	& .threed {
		transition: all 0.25s ease;

		&:hover {
			box-shadow: 1px 1px hsl(120, 100%, 35%), 2px 2px hsl(120, 100%, 35%),
				3px 3px hsl(120, 100%, 35%);
			transform: translate(-3px);
		}
	}
`;

const QuestionHeading = styled.div`
	width: 100%;
	& h4 {
		text-align: center;
		text-decoration: underline;
	}
`;

function OnlineGame() {
	return (
		<Layout title="Game · solo" color="hsl(186, 40%, 32%)">
			<FlexWrapper>
				<QuestionBox>
					<QuestionHeading>
						<h4>COMING SOON!</h4>

						<Button
							size="lg"
							color="success"
							href="/game"
							style={{ width: "100%", marginTop: "0.5rem" }}
						>
							Back to Game Selection
						</Button>
					</QuestionHeading>
				</QuestionBox>
			</FlexWrapper>
		</Layout>
	);
}

export default OnlineGame;
