import { useState } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap";
import styled from "styled-components";
import JSONPretty from "react-json-pretty";
import axios from "axios";

const JSONPrettyMon = require("react-json-pretty/dist/monikai");

const FlexWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column:
    align-items: center;
    justify-content: center;
`;

const HeadingBox = styled.div`
	display: flex;
	justify-content: center;
	padding: 1rem;
	background-color: white;
	border: 2px solid hsl(189, 78%, 39%);
	margin-bottom: 1rem;

	@media screen and (max-width: 600px) {
	}
`;

const DataSelector = styled.div`
	width: 60%;

	@media screen and (max-width: 900px) {
		width: 100%;
	}
`;

const ButtonBox = styled.div`
	background-color: hsla(185, 50%, 50%, 0.15);
	border-radius: 3px;
	padding: 0.5rem;
`;

const Statistics = () => {
	const [apiResponse, setApiResponse] = useState({ msg: "Please select a data option" });
	const [apiURL, setApiURL] = useState(null);

	function handleChoice(event) {
		setApiURL(event.target.value);
	}

	async function getData() {
		if (apiURL === null)
			return setApiResponse({ error: "You must first select the data to retrieve" });
		try {
			const { data } = await axios.get(
				`${process.env.BASE_URL}/api/userStatistics/${apiURL}`
			);
			if (!data || data.err) return setApiResponse(err);
			setApiResponse(data);
			setApiURL(null);
		} catch (err) {
			setApiResponse({ err });
		}
	}

	return (
		<Layout title="Site Statistics" color="pink">
			<FlexWrapper>
				<Container
					fluid="sm"
					style={{ backgroundColor: "hsla(0, 0%, 100%, 0.15)", padding: "1rem" }}
				>
					<HeadingBox>
						<DataSelector>
							<Row className="text-center">
								<Col>
									<h2>Choose what data you want to retrieve</h2>
								</Col>
							</Row>
							<ButtonBox>
								<Row className="text-center">
									<Col>
										<ButtonGroup>
											<Button
												size="lg"
												outline
												color="primary"
												value="registrations"
												onClick={handleChoice}
												active={apiURL === "registrations"}
											>
												Registrations
											</Button>
											<Button
												size="lg"
												outline
												color="primary"
												value="scores"
												onClick={handleChoice}
												active={apiURL === "scores"}
											>
												Scores
											</Button>
										</ButtonGroup>
									</Col>
								</Row>
								<Row style={{ marginTop: "0.5rem" }}>
									<Col>
										<Button color="info" onClick={getData} block>
											Get Data
										</Button>
									</Col>
								</Row>
							</ButtonBox>
						</DataSelector>
					</HeadingBox>
					<Row>
						<Col>
							<JSONPretty
								id="json-pretty"
								data={apiResponse}
								theme={JSONPrettyMon}
								style={{
									minHeight: "400px",
									backgroundColor: "#272822",
									padding: "1rem"
								}}
							/>
						</Col>
					</Row>
				</Container>
			</FlexWrapper>
		</Layout>
	);
};

export default Statistics;
