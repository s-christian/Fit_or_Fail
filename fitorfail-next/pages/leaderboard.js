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
`;

const Leaderboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.BASE_URL}/api/topUsers`).then(({ data }) => {
			setUsers(data);
		});
	}, []);

	console.log(users);

	return (
		<Layout title="Leaderboard" color="hsl(276, 61%, 75%)">
			<CenterWrapper>
				<div id="tableWrapper">
					<h1>Solo Leaderboard</h1>
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
								<Link href={`/users/${user.username}`}>
									<tr>
										<th scope="row">#{index + 1}</th>
										<td>{user.username}</td>
										<td>{user.points}</td>
										<td style={{ textAlign: "center" }}>{user.totalAnswers}</td>
										<td style={{ textAlign: "right" }}>
											{(user.percentageCorrect * 100).toFixed(2)}%
										</td>
									</tr>
								</Link>
							))}
						</tbody>
					</Table>

					<h1>Multiplayer Leaderboard</h1>
					<Table striped hover>
						<thead>
							<tr style={{ textAlign: "center" }}>
								<th>Coming soon!</th>
							</tr>
						</thead>
					</Table>
				</div>
			</CenterWrapper>
		</Layout>
	);
};

export default Leaderboard;
