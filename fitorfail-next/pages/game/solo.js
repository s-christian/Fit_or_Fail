/* Resources:
 * https://www.youtube.com/watch?v=aq-fCtg_gG4
 */

import Layout from "../../components/Layout";
import { Spinner, Fade, ListGroup, ListGroupItem } from "reactstrap";
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

	@media screen and (max-width: 750px) {
		width: 100%;
		border-radius: 0;
		border-left: 0;
		border-right: 0;
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
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchQuestions = () => {
		axios
			.get(`${process.env.BASE_URL}/api/getQuizQuestions`)
			.then(({ data }) => {
				setQuizQuestions(data);
				setNumOfQuestions(data.length);
				setCurrentQuestion(data[0]);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
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
		setLoading(true);
		setCurrentQuestion({});
		setQuestionCount(0);
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
						{error && <p>{error}</p>}
						{questionCount < numOfQuestions ? (
							<>
								<QuestionHeading>
									<h4>Question {questionCount + 1}</h4>
									<h3>{currentQuestion.question}</h3>
								</QuestionHeading>
								<ListGroup style={{ width: "100%" }}>
									{currentQuestion.choices.map((choice) => (
										<ListGroupItem
											tag="button"
											style={{}}
											key={currentQuestion.choices.indexOf(choice)}
											value={currentQuestion.choices.indexOf(choice)}
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
								<div>
									<h4>Your Score:</h4>
									<ul>
										<li>Correct answers: {correctCount}</li>
										<li>Points: {pointSum}</li>
									</ul>
								</div>
								<div>
									<button onClick={handlePlayAgain}>Play Again</button>
								</div>
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
