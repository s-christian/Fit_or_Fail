import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Badge, ListGroup, ListGroupItem, Button } from "reactstrap";
import styled from "styled-components";

const MediaContainer = styled(Container)`
	width: 100vw;
	height: 100vh;
	@media screen and (max-width: 50rem) {
		font-size: 3rem;
		margin-bottom: 200px;
	}
`;

const BoardStyle = styled(Container)`
	@media screen and (max-width: 50rem) {
		font-size: 2.5rem;
	}
`;

const RowStyle = styled(Row)`
	background-color: ;rgba(255, 0, 0, 0.5)
	border: 1px solid black;
	margin: 2px;
	
	background-color: #fd943f;
	@media screen and (max-width: 50rem) {
		font-size: 2rem;
	}
`;

const BadgeStyle = styled(Badge)`
	border: 1px solid rgba(255, 0, 0, 0.8);
	margin-bottom: 2px;
	padding: 5px;
	color: rgba(255, 0, 0, 0.8);
	&:hover {
		color: rgba(249, 208, 129, 1);
		border: 2px solid rgba(249, 208, 129, 1);
	}
	@media screen and (max-width: 50rem) {
		font-size: 1.5rem;
		background-color: rgba(249, 208, 129, 1);
	}
`;

const StyledButton = styled(Button)`
	border: 5px solid;
	position: absolute;
	bottom: -300px;
	z-index: 1;
	display: block;
	top: calc(50% - 2.5rem - 5px);
	left: calc(50% - 6rem - 5px);
	height: 3rem;
	width: 9rem;
	margin: auto;
	background-color: rgba(249, 208, 129, 1);

	&:hover {
		opacity: 1;
		background-color: rgba(255, 0, 0, 0.8);
		border: 5px solid rgba(249, 208, 129, 1);
	}

	@media screen and (max-width: 43rem) {
		position: absolute;
		bottom: -1050px;
	}
`;

const HeaderStyle = styled.h1`
	border: 2px solid;
	margin-bottom: 3px;
	font-weight: 600;
	color: rgba(255, 0, 0, 0.8);
	width: 25vw;
	
	@media screen and (max-width: 50rem) {
		font-size: 1.7rem;
	}
`;
const Leaderboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.BASE_URL}/api/topUsers`)
		.then(({ data }) => {setUsers(data);
		});
	}, []);

	return (
		<Layout
			title="Leaderboard"
			color="  background: -webkit-linear-gradient(180deg, #ff6464 50%, #5ac8fa 50%);
		background: -o-linear-gradient(180deg, #ff6464 50%, #5ac8fa 50%);
		background: -moz-linear-gradient(180deg, #ff6464 50%, #5ac8fa 50%);
		background: linear-gradient(1800deg, #ff6464 50%, #5ac8fa 50%);
	  }"
		>
			<MediaContainer
				style={{
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<HeaderStyle>
					Leaderboard
					<BadgeStyle href="/leaderboard" color="">
						Refresh
					</BadgeStyle>
				</HeaderStyle>
				<ListGroup >
					<BoardStyle>
						<ListGroupItem style={{backgroundColor:"rgba(255, 0, 0, 0.5)"}}>
						<Row>
							<Col>Name</Col>
							<Col>Points</Col>
							<Col>team</Col>
						</Row>
						</ListGroupItem>
						
						<ListGroupItem style={{backgroundColor:"rgba(255, 0, 0, 0.5)"}}>
							{users.map((user) => (
								
									<RowStyle>
										<Col>{user.username}</Col>
										<Col>{user.points} </Col>
										<Col>{user.team}</Col>
									</RowStyle>
								
							))}</ListGroupItem>
						
					</BoardStyle>

					<a href="/game">
						<StyledButton>PLAY</StyledButton>
					</a>
				</ListGroup>
			</MediaContainer>
		</Layout>
	);
};

export default Leaderboard;
