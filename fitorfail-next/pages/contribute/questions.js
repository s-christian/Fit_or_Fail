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
import StyledLink from "../../components/StyledLink";
import Styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { set } from "mongoose";
import Router from "next/router";

const Box = Styled(Container)`  
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 25vh;;
	overflow: auto;
	& thead {
		background-color: hsl(119, 0%, 95%);
	}
	& tbody tr {
		background-color: hsl(119, 0%, 95%);
	}
`;

const Questionbox = Styled(Input)`
	width: 40vw;
	overflow: hidden;
`;

const Inputbox = Styled(Container)`
	width: 40vw;
	justify-content: center;
	align-items:center;
`;

const Answer = Styled(Input)`
	width: 40vw;
`;
const Answer1 = Styled(Input)`
	width: 40vw;
`;
const Answer2 = Styled(Input)`
	width: 40vw;
`;
const Answer3 = Styled(Input)`
	width: 40vw;
`;

const Questions = () => {
	const [questions, setQuestions] = useState([]);
	const [newQuestion, setNewQuestion] = useState([]);
	const [answerOne, setAnswerOne] = useState("");
	const [answerTwo, setAnswerTwo] = useState("");
	const [answerThree, setAnswerThree] = useState("");
	const [answerFour, setAnswerFour] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post("/questions", {
				newQuestion,
				answerOne,
				answerTwo,
				answerThree,
				answerFour
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data.error);
				}
			});
	}
	function onChange(e) {}

	useEffect(() => {
		axios.get(`${process.env.BASE_URL}/api/getQuizQuestions`).then(({ data }) => {
			setQuestions(data);
		});
	}, []);
	return (
		<Layout title="Questions Center" color="#55dd99">
			<Form style={{ textAlign: "center" }}>
				<h1>Question Submission Form</h1>
				<FormGroup>
					<Label for="questionSubmission">Question here:</Label>
					<Inputbox>
						<Questionbox
							type="text"
							id="questionSubmission"
							name="questionSubmission"
							placeholder="Enter Quesiton Here"
						/>

						<Label for="answerSubmission">Answer: (1 point)</Label>
						<Answer
							type="text"
							id="answerSubmission"
							name="answerSubmission"
							placeholder="Answer"
						/>

						<Label for="answerSubmission">Answer: (1 point)</Label>
						<Answer1
							type="text"
							id="answerSubmission"
							name="answerSubmission"
							placeholder="Answer"
						/>

						<Label for="answerSubmission">Answer: (1 point)</Label>
						<Answer2
							type="text"
							id="answerSubmission"
							name="answerSubmission"
							placeholder="Answer"
						/>

						<Label for="answerSubmission">Correct Answer: (1 point)</Label>
						<Answer3
							type="text"
							id="answerSubmission"
							name="answerSubmission"
							placeholder="Answer"
						/>
					</Inputbox>
				</FormGroup>
			</Form>
			<Box>
				<Table>
					<thead>
						<tr>
							<th>Questions</th>
							<th>Choices</th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					{questions.map((quest, index) => (
						<tbody>
							<tr>
								<th scope="row">
									{index + 1}: {quest.question}{" "}
								</th>
								{quest.choices.map((choice) => (
									<td>{choice}</td>
								))}
							</tr>
						</tbody>
					))}
				</Table>
			</Box>
			<StyledLink href="/contribute" hoverColor="red">
				Back to Contribute Center
			</StyledLink>
		</Layout>
	);
};

export default Questions;
