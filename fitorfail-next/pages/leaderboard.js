import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Table } from "reactstrap";
import styled from "styled-components";

const CenterWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TableWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: center;
	padding: 1rem;

	& .tableContainer {
		border: 2px solid black;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}
	& #soloTable {
		margin-right: 1rem;
	}
	& h1 {
		margin-bottom: 0;
		text-align: center;
		color: white;
		padding: 1rem;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;

		&#soloHeading {
			background-color: hsl(189, 78%, 39%);
		}
		&#onlineHeading {
			background-color: hsl(112, 57%, 42%);
		}
	}
	& table {
		margin-bottom: 0;
	}
	& thead tr {
		background-color: hsl(0, 75%, 60%);
	}
	& tbody tr {
		background-color: hsl(119, 0%, 95%);
		cursor: pointer;

		& :hover {
			color: white;
			background-color: hsl(308, 76%, 22%);

			animation: popOut 500ms forwards;

			@keyframes popOut {
				from {
					transform: scale(1);
				}
				to {
					transform: scale(1.25);
				}
			}
		}
		& :active {
			background-color: hsl(308, 76%, 44%);
		}
	}

	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: center;

		& #soloTable {
			margin-right: 0;
			margin-bottom: 1rem;
		}
	}
	@media screen and (max-width: 500px) {
		padding: 1rem 0;
		& .tableContainer {
			width: 100%;
		}
		& h1 {
			text-align: center;
			font-size: 1.8rem;
		}
		& table {
			font-size: 0.75rem;
		}
	}
	@media screen and (max-width: 400px) {
		& table {
			font-size: 0.5rem;
		}
	}
`;

const Leaderboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.BASE_URL}/api/topUsers`).then(({ data }) => {
			setUsers(data);
		});
	}, []);

	return (
		<Layout title="Leaderboard" color="hsl(276, 61%, 75%)">
			<CenterWrapper>
				<TableWrapper>
					<div id="soloTable" className="tableContainer">
						<h1 id="soloHeading">Solo Leaderboard</h1>
						<Table>
							<thead>
								<tr>
									<th>Global Rank</th>
									<th>Username</th>
									<th>Points</th>
									<th>Total Answers</th>
									<th>Correct Rate</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<Link
										href="/users/[username]"
										as={`/users/${user.username}`}
										key={index}
									>
										<tr>
											<th scope="row">#{index + 1}</th>
											<td>{user.username}</td>
											<td>{user.points}</td>
											<td style={{ textAlign: "center" }}>
												{user.totalAnswers}
											</td>
											<td style={{ textAlign: "right" }}>
												{(user.percentageCorrect * 100).toFixed(2)}%
											</td>
										</tr>
									</Link>
								))}
							</tbody>
						</Table>
					</div>
					<div id="onlineTable" className="tableContainer">
						<h1 id="onlineHeading">Multiplayer Leaderboard</h1>
						<Table striped hover>
							<thead>
								<tr style={{ textAlign: "center" }}>
									<th>Coming soon!</th>
								</tr>
							</thead>
						</Table>
					</div>
				</TableWrapper>
			</CenterWrapper>
		</Layout>
	);
};

export default Leaderboard;
