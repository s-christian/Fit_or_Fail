// UI for government personnel or admins to add or delete questions from the question pool
// Display a list of all questions by ID
// Questions will have IDs that span 1, 2, ... , n. These will NOT be the actual Question _ids, but rather a convenience for the end user.
// The IDs will be assigned based on whichever Question was fetched first, and it will be laid out on the page.
// The actual value of that Question will be its _id to be used to pass to the API for deletion.
// After deleting a question, subtract 1 from all Questions that come after that one:
//     1, 2, ... , k , k+1 , ... , n => 1, 2, ... , k ,  ... , n-1
// Then rerender the list of questions, add a loading spinny maybe (at least add an "isLoading" state while fetching the list of questions).

// Add a button on an authenticated User's profile page to navigate to this page, if they're a gov or admin
// Ex: "Click here to modify the question pool!" It's a privileged action.

import Layout from "../../components/Layout";
import styled from "styled-components";
import {
	Alert,
	Form,
	FormGroup,
	Label,
	Col,
	Input,
	FormFeedback,
	Button,
	Table,
	ListGroup,
	ListGroupItem
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const CenterWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-around;
	padding: 2rem;

	@media screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

const QuestionPanel = styled.div`
	background-color: white;
	border-radius: 3px;
	padding: 2rem;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);
	width: 500px;

	@media screen and (max-width: 600px) {
		border-radius: 0;
		width: 100%;

		& h1 {
			font-size: 2rem;
		}
		& h3 {
			font-size: 1rem;
		}
	}
`;

const PanelHeading = styled.div`
	border: 1px 1px 0 1px solid black;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	font-size: 2rem;
	font-weight: 300;
	background-color: hsla(0, 0%, 100%, 0.8);
	width: 100%;
	text-align: center;
	border-bottom: 1px solid hsl(0, 0%, 17%);
	margin-bottom: 1rem;
`;

const TablePanel = styled.div`
	background-color: white;
	border-radius: 3px;
	padding: 2rem;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);

	@media screen and (max-width: 600px) {
		border-radius: 0;
		width: 100%;

		& h1 {
			font-size: 2rem;
		}
		& h3 {
			font-size: 1rem;
		}
	}
`;

const Questions = () => {
	const [allQuestions, setAllQuestions] = useState([]);
	const [newQuestion, setNewQuestion] = useState("");
	const [newQuestionError, setNewQuestionError] = useState(false);
	const [choices, setChoices] = useState({
		choice1: {
			answer: "",
			error: false
		},
		choice2: {
			answer: "",
			error: false
		},
		choice3: {
			answer: "",
			error: false
		},
		choice4: {
			answer: "",
			error: false
		}
	});
	const [correctChoiceIndex, setCorrectChoiceIndex] = useState(1);
	const [newQuestionPoints, setNewQuestionPoints] = useState(10);
	const [submitted, setSubmitted] = useState(false);
	const [apiError, setApiError] = useState("");

	function getQuestions() {
		axios.get(`${process.env.BASE_URL}/api/questions`).then(({ data }) => {
			setAllQuestions(data);
		});
	}

	useEffect(() => {
		getQuestions();
	}, []);

	console.log("ALL QUESTIONS:");
	console.log(allQuestions);

	function handleSubmit(e) {
		e.preventDefault();

		// Check for errors
		setNewQuestionError(!newQuestion);
		setChoices({
			choice1: {
				answer: choices.choice1.answer,
				error: !choices.choice1.answer
			},
			choice2: {
				answer: choices.choice2.answer,
				error: !choices.choice2.answer
			},
			choice3: {
				answer: choices.choice3.answer,
				error: !choices.choice3.answer
			},
			choice4: {
				answer: choices.choice4.answer,
				error: !choices.choice4.answer
			}
		});

		// If there are errors, don't attempt to submit the question
		if (
			!newQuestion ||
			!choices.choice1.answer ||
			!choices.choice2.answer ||
			!choices.choice3.answer ||
			!choices.choice4.answer
		)
			return;

		// Submit the question
		// question, choices, correctIndex, points
		axios
			.post("/api/questions", {
				question: newQuestion,
				choices: [
					choices.choice1.answer,
					choices.choice2.answer,
					choices.choice3.answer,
					choices.choice4.answer
				],
				correctIndex: correctChoiceIndex - 1,
				points: newQuestionPoints
			})
			.then(({ data }) => {
				setAllQuestions([...allQuestions, data.question]);
				console.log(data.question);
			})
			.catch((error) => {
				if (error.response) {
					setApiError("API Error: " + error.response.data.error);
					setTimeout(() => setApiError(""), 5000);
					console.log(error.response.data.error);
				} else {
					setApiError("API Error: Improper data");
					console.log(error);
				}
			});

		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 5000); // alert disappears after 5 seconds
	}

	return (
		<Layout title="Questions Center" color="#55dd99">
			<CenterWrapper>
				<QuestionPanel>
					<PanelHeading>Submit a Question</PanelHeading>
					{submitted && (
						<Alert
							color={apiError ? "danger" : "success"}
							style={{ textAlign: "center" }}
						>
							{apiError ? apiError : "Question submitted!"}
						</Alert>
					)}
					<Form onSubmit={handleSubmit}>
						<FormGroup row>
							{/* "for=" refers to the id */}
							<Label for="question">Question</Label>
							<Col>
								<Input
									type="text"
									name="question"
									id="question"
									placeholder="Why did the chicken cross the road?"
									value={newQuestion}
									onChange={(e) => setNewQuestion(e.target.value)}
									invalid={newQuestionError}
								/>
								{newQuestionError && (
									<FormFeedback>You must provide the question</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="choice1">Choice 1</Label>
							<Col>
								<Input
									type="text"
									name="choice1"
									id="choice1"
									placeholder="Answer 1"
									value={choices.choice1.answer}
									onChange={(e) =>
										setChoices({
											...choices,
											choice1: { answer: e.target.value }
										})
									}
									invalid={choices.choice1.error}
								/>
								{choices.choice1.error && (
									<FormFeedback>You must provide all four choices</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="choice2">Choice 2</Label>
							<Col>
								<Input
									type="text"
									name="choice2"
									id="choice2"
									placeholder="Answer 2"
									value={choices.choice2.answer}
									onChange={(e) =>
										setChoices({
											...choices,
											choice2: { answer: e.target.value }
										})
									}
									invalid={choices.choice2.error}
								/>
								{choices.choice2.error && (
									<FormFeedback>You must provide all four choices</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="choice3">Choice 3</Label>
							<Col>
								<Input
									type="text"
									name="choice3"
									id="choice3"
									placeholder="Answer 3"
									value={choices.choice3.answer}
									onChange={(e) =>
										setChoices({
											...choices,
											choice3: { answer: e.target.value }
										})
									}
									invalid={choices.choice3.error}
								/>
								{choices.choice3.error && (
									<FormFeedback>You must provide all four choices</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="choice4">Choice 4</Label>
							<Col>
								<Input
									type="text"
									name="choice4"
									id="choice4"
									placeholder="Answer 4"
									value={choices.choice4.answer}
									onChange={(e) =>
										setChoices({
											...choices,
											choice4: { answer: e.target.value }
										})
									}
									invalid={choices.choice4.error}
								/>
								{choices.choice4.error && (
									<FormFeedback>You must provide all four choices</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="correctChoiceIndex">Correct Choice</Label>
							<Col>
								<Input
									type="select"
									name="correctChoiceIndex"
									id="correctChoiceIndex"
									value={correctChoiceIndex}
									onChange={(e) => setCorrectChoiceIndex(e.target.value)}
								>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="newQuestionPoints">Points</Label>
							<Col>
								<Input
									type="number"
									name="newQuestionPoints"
									id="newQuestionPoints"
									value={newQuestionPoints}
									onChange={(e) => setNewQuestionPoints(e.target.value)}
									invalid={newQuestionPoints < 10 || newQuestionPoints > 1000}
								/>
								{(newQuestionPoints < 10 || newQuestionPoints > 1000) && (
									<FormFeedback>Points must be between 10 and 1000</FormFeedback>
								)}
							</Col>
						</FormGroup>
						<Button
							block
							size="lg"
							color="success"
							type="submit"
							disabled={newQuestionPoints < 10 || newQuestionPoints > 1000}
						>
							Submit
						</Button>
					</Form>
				</QuestionPanel>
				<TablePanel>
					<Table>
						<thead>
							<tr>
								<th>Question</th>
								<th>Choices</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{allQuestions.map((question, index) => (
								<tr key={index + 20}>
									<th scope="row">#{index + 1}</th>
									<td>
										<ListGroup>
											{question.choices.map((choice, index) => (
												<ListGroupItem
													key={index + 10}
													style={{
														display: "flex",
														justifyContent: "space-between",
														backgroundColor:
															index === question.correctIndex
																? "#55dd99"
																: "white"
													}}
												>
													<span
														style={{
															fontSize: "0.75rem",
															fontWeight: "300"
														}}
													>
														{index + 1} -{" "}
													</span>

													<span>{choice}</span>
												</ListGroupItem>
											))}
										</ListGroup>
									</td>
									<td>{question.points}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</TablePanel>
			</CenterWrapper>
		</Layout>
	);
};

export default Questions;
