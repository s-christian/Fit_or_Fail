/* Resources:
 * https://www.youtube.com/watch?v=aq-fCtg_gG4
 */

import Layout from "../../components/Layout";
import { Spinner, Fade, Alert, Button, ListGroup, ListGroupItem, Table } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
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

const Solo = () => {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [numOfQuestions, setNumOfQuestions] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [start, setStart] = useState(false);

	const fetchQuestions = () => {
		axios
			.get(`${process.env.BASE_URL}/api/getQuizQuestions`)
			.then(({ data }) => {
				setQuizQuestions(data);
				setNumOfQuestions(data.length);
				setCurrentQuestion(data[0]);
				setQuestionCount(0);
				setStart(false);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(true);
				setQuestionCount(0);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	const [questionCount, setQuestionCount] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);
	const [pointSum, setPointSum] = useState(0);

	const nextQuestion = () => {
		setQuestionCount(questionCount + 1);
		if (questionCount < numOfQuestions - 1)
			setCurrentQuestion(quizQuestions[questionCount + 1]);
		// Else, we've finished the game, so go ahead and submit the User's scores
	};

	const handleAnswer = (event) => {
		const choice = parseInt(event.target.value); // force the default String provided by "value" into a Number
		// If answer is correct
		if (choice === currentQuestion.correctIndex) {
			setCorrectCount(correctCount + 1);
			setPointSum(pointSum + currentQuestion.points);
		}
		nextQuestion();
	};

	const handlePlayAgain = () => {
		setCorrectCount(0);
		setPointSum(0);
		fetchQuestions();
	};

	// Need another API router to add pints and correct answers to User total
	const handleSubmitScores = () => {
		axios
			.post(`${process.env.BASE_URL}/api/submitScores`, {
				correctCount,
				pointSum,
				numOfQuestions
			})
			//.then(({ data }) => console.log(data)) // contains the updated information stored in the database for the User
			.catch((error) => console.error(error));
	};

	//

	if (!loading) {
		return (
			<Layout title="Game · solo" color="hsl(156, 80%, 86%)">
				<FlexWrapper>
					<QuestionBox>
						{error ? (
							<Alert
								color="danger"
								style={{
									width: "100%",
									fontSize: "1.25rem",
									textAlign: "center"
								}}
							>
								Cannot fetch questions. Try{" "}
								<a href="/login?redirect=/game/solo" className="alert-link">
									logging in
								</a>{" "}
								again.
							</Alert>
						) : (
							<>
								{!start ? (
									<>
										<QuestionHeading>
											<h4>Are you ready?!</h4>

											<Button
												size="lg"
												color="success"
												onClick={() => setStart(true)}
												style={{ width: "100%", marginTop: "0.5rem" }}
											>
												START
											</Button>
										</QuestionHeading>
									</>
								) : (
									<>
										{questionCount < numOfQuestions ? (
											<>
												<QuestionHeading>
													<h4>
														Question {questionCount + 1} of{" "}
														{numOfQuestions}
													</h4>
													<h3>{currentQuestion.question}</h3>
												</QuestionHeading>
												<ListGroup style={{ width: "100%" }}>
													{currentQuestion.choices.map((choice) => (
														<ListGroupItem
															tag="button"
															className="threed"
															key={currentQuestion.choices.indexOf(
																choice
															)}
															value={currentQuestion.choices.indexOf(
																choice
															)}
															onClick={handleAnswer}
															action
														>
															{choice}
														</ListGroupItem>
													))}
												</ListGroup>
											</>
										) : (
											<>
												{handleSubmitScores()}
												<QuestionHeading>
													<h4>Your Score:</h4>
													<Table borderless size="sm">
														<tr>
															<th>Correct answers:</th>
															<th className="text-right">
																{correctCount}
															</th>
														</tr>
														<tr>
															<th>Points:</th>
															<th className="text-right">
																{pointSum}
															</th>
														</tr>
													</Table>
													<Button
														size="lg"
														color="info"
														onClick={handlePlayAgain}
														style={{ width: "100%" }}
													>
														Play Again
													</Button>
												</QuestionHeading>
											</>
										)}
									</>
								)}
							</>
						)}
					</QuestionBox>
				</FlexWrapper>
			</Layout>
		);
	} else {
		return (
			<Layout title="Game · solo" color="hsl(156, 79%, 81%)">
				<Fade
					in={loading}
					style={{
						display: "flex",
						flex: "1",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Spinner style={{ height: "4rem", width: "4rem" }} />
				</Fade>
			</Layout>
		);
	}
};

export default Solo;
