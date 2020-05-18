import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
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

const LeaderBoardColumnHeader = styled(Row) `
@media screen and (max-width: 50rem) {
	font-size: 1.4rem;
	
}
`;

const RowStyle = styled(Row)`
	background-color: ;rgba(255, 0, 0, 0.5)
	border: 1px solid black;
	margin: 2px;
	
	background-color: #fd943f;
	@media screen and (max-width: 50rem) {
		font-size: 1rem;
	}
`;

const StyledButton = styled(Button)`
	border: 5px solid;
	float: bottom;
	display:flex;
	z-index: 1;
	display: block;
	top: calc(50% - 2.5rem - 5px);
	left: calc(50% - 6rem - 5px);
	height: 3rem;
	width: 9rem;
	margin: auto;
	background-color: #5ac8fa;

	&:hover {
		opacity: 1;
		background-color: rgba(255, 0, 0, 0.8);
		border: 5px solid rgba(249, 208, 129, 1);
	}

	@media screen and (max-width: 40rem) {
		position: absolute;
		bottom: 0;
		margin-top: 250px;
	}
`;

const HeaderStyle = styled.h1`
	
	margin-bottom: 3px;
	font-weight: 600;
	color: rgba(255, 0, 0, 0.8);;
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
			color="  background: -webkit-linear-gradient(180deg, #7fff00 50%, #5ac8fa 50%);
		background: -o-linear-gradient(180deg, #7fff00 50%, #5ac8fa 50%);
		background: -moz-linear-gradient(180deg, #7fff00 50%, #5ac8fa 50%);
		background: linear-gradient(1800deg, #7fff00 50%, #5ac8fa 50%);
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
				</HeaderStyle>
				<ListGroup >
					<BoardStyle>
						<ListGroupItem style={{backgroundColor:"red"}}>
						<LeaderBoardColumnHeader>
							<Col>Name</Col>
							<Col>Points</Col>
							<Col>team</Col>
						</LeaderBoardColumnHeader>
						</ListGroupItem>
						
						<ListGroupItem style={{backgroundColor:"red"}}>
							{users.map((user) => (
									<RowStyle>
										<Col>{user.username}</Col>
										<Col>{user.points} </Col>
										<Col>{user.team}</Col>
									</RowStyle>
								
							))}</ListGroupItem>
						
						</BoardStyle>
					</ListGroup>
					
					<a href="/game">
						<StyledButton>PLAY</StyledButton>
					</a>
			</MediaContainer>
		</Layout>
	);
};

export default Leaderboard;
