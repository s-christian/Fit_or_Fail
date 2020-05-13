/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 * https://github.com/zeit/swr#ssr-with-nextjs
 */

import axios from "axios";
import dayjs from "dayjs";
import cookies from "next-cookies";
import { useState } from "react";
import styled, { css } from "styled-components";
import Layout from "../../components/Layout";
import { Button, Table } from "reactstrap";

const ProfileWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	justify-content: flex-start;
	padding: 2rem;
	overflow: scroll;

	@media screen and (max-width: 900px) {
		flex-direction: column;
	}
	@media screen and (max-width: 600px) {
		padding: 1rem;
	}
`;

// "flex: 1;" is equivalent to "flex-basis: 0; flex-grow: 1; flex-shrink: 1;"
const FirstColumn = styled.div`
	flex: 1;
	margin-right: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	min-width: 350px;

	@media screen and (max-width: 900px) {
		margin-right: 0;
		width: 100%;
		margin-bottom: 1rem;
		justify-content: center;
		flex: 0;
	}
	@media screen and (max-width: 600px) {
		margin-bottom: 1rem;
	}
`;

const ProfileBox = styled.div`
	width: 100%;
	background-color: hsla(0, 0%, 100%, 0.6);
	border: 2px solid black;
	border-radius: 3px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	@media screen and (max-width: 900px) {
		margin-bottom: 1rem;
	}
`;
const Authenticated = styled.div`
	border: 1px 1px 0 1px solid black;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	font-size: 2rem;
	font-weight: 300;
	background-color: hsla(0, 0%, 100%, 0.8);
	width: 100%;
	text-align: center;
`;
const ProfileHeading = styled.div`
	width: 100%;
	padding: 1rem;
	margin-right: -2rem;
	margin-left: -2rem;
	background-color: hsla(0, 0%, 100%, 0.5);
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 3rem;
`;
const ProfilePicture = styled.img`
	height: 250px;
	width: 250px;
	border-radius: 50%;
	margin: auto;
	border: 1px solid black;

	${(props) =>
		props.notFound &&
		css`
			border: 1px solid white;
		`}

	@media screen and (max-width: 600px) {
		height: 150px;
		width: 150px;
	}
`;
const StyledTable = styled(Table)`
	margin: 1rem 0;
	width: 50%;
	th.text-right {
		color: hsl(0, 0%, 17%);
		font-weight: 600;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
const ColorSelector = styled.div`
	text-align: center;
	color: white;
	text-shadow: 0 3px 3px black;

	& input {
		padding: 0.25rem;
	}
`;

const AdminPanel = styled.div`
	text-align: center;
	margin-top: 2rem;
	width: 100%;
	height: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	border: 2px solid black;
	border-radius: 3px;

	@media screen and (max-width: 900px) {
		margin-top: 0;
	}
`;
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 20rem;
`;

const InfoBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 3;
	padding: 2rem;
	font-size: 2rem;
	background-color: hsla(0, 0%, 100%, 0.8);
	border: 2px solid black;
	border-radius: 3px;

	@media screen and (max-width: 900px) {
		flex: 1;
		flex-direction: column;
		padding: 0.5rem;
		font-size: 1.5rem;
	}
`;

const NotFoundWrapper = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;
const NotFound = styled.div`
	text-align: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	align-items: center;
	justify-content: center;
	background-color: hsla(0, 0%, 100%, 0.6);
	border: 5px solid white;

	font-size: 2rem;

	& #username {
		color: white;
		text-shadow: 2px 2px 4px black;
		font-weight: 700;
	}

	@media screen and (max-width: 750px) {
		flex: 1;
		border-left: 0;
		border-right: 0;
	}
`;

const Userpage = ({ user, username, authenticated }) => {
	// --- USER DOES NOT EXIST ---
	if (!user)
		return (
			<Layout title="User not found" color="orange">
				<NotFoundWrapper>
					<NotFound>
						<img src="/assets/images/user_not_found.png" />
						<h1>
							User <span id="username">{username}</span> does not exist!
						</h1>
					</NotFound>
				</NotFoundWrapper>
			</Layout>
		);

	// --- USER EXISTS ---
	const [color, setColor] = useState("hsl(189, 67%, 49%)");
	const handleColor = (e) => {
		setColor(e.target.value);
	};

	return (
		<Layout title={`${user.username} · player info`} color={color} style={{ padding: "20rem" }}>
			<ProfileWrapper>
				<FirstColumn>
					<ProfileBox>
						{authenticated && <Authenticated>YOU ARE LOGGED IN!</Authenticated>}
						<ProfileHeading>
							<ProfilePicture
								src={user.profile_picture_url}
								alt={`${user.username}'s profile picture`}
							/>
							<span>{user.username}</span>
						</ProfileHeading>
						<StyledTable borderless size="sm">
							<tbody>
								<tr>
									<th>Points:</th>
									<th className="text-right">{user.points}</th>
								</tr>
								<tr>
									<th>Total answers:</th>
									<th className="text-right">{user.totalAnswers}</th>
								</tr>
								<tr>
									<th>Correct answers:</th>
									<th className="text-right">{user.correctAnswers}</th>
								</tr>
								<tr>
									<th>Wins:</th>
									<th className="text-right">{user.wins}</th>
								</tr>
								<tr>
									<th>Team:</th>
									<th className="text-right">{user.team}</th>
								</tr>
								<tr>
									<th>Member since:</th>
									<th className="text-right">
										{dayjs(user.register_date).format("MM/DD/YYYY")}
									</th>
								</tr>
								<tr>
									<th>Account type:</th>
									<th className="text-right">{user.account_type}</th>
								</tr>
							</tbody>
						</StyledTable>
						<ColorSelector>
							<h4>Color: {color}</h4>
							<div className="ui search">
								<input type="text" onChange={handleColor} value={color} />
							</div>
						</ColorSelector>
					</ProfileBox>
					{authenticated &&
						(user.account_type === "gov" || user.account_type === "admin") && (
							<AdminPanel>
								<h1 style={{ fontWeight: "300" }}>Admin Panel</h1>
								<ButtonContainer>
									<a href="/statistics">
										<Button size="lg" outline color="info">
											User Statistics
										</Button>
									</a>
									<a href="/contribute">
										<Button size="lg" outline color="info">
											Contribute
										</Button>
									</a>
								</ButtonContainer>
							</AdminPanel>
						)}
				</FirstColumn>
				<InfoBox>
					<div>
						Extra information goes here!
						<ul>
							<li>Friends list</li>
							<li>Graph of score over time</li>
							<li>Medals/Achievements earned</li>
							<li>...and more!</li>
						</ul>
					</div>
				</InfoBox>
			</ProfileWrapper>
		</Layout>
	);
};

// Marks the page to be server-side rendered on every request
export async function getServerSideProps(context) {
	const { username } = context.params; // username from dynamic route
	let user = null;

	const { token } = cookies(context); // grab the "token" cookie
	let authenticated = false;

	// if the user has an active token
	if (token) {
		try {
			const { data } = await axios.post(`${process.env.BASE_URL}/api/decodeToken`, {
				token
			});
			const tokenInfo = data.decoded;
			// Need to check if the page being served is the one that belongs to the authenticated user.
			if (tokenInfo.username === username) authenticated = true;
		} catch (err) {
			console.error({ error: "Cannot reach api endpoint for decodeToken", err });
		}
	}

	// Retrieve the User's information. If the User is authenticated to their own profile page, the user will also contain their email address.
	try {
		const { data } = await axios.post(
			`${process.env.BASE_URL}/api/users/username/${username}`,
			{ token }
		);
		if (data.user) user = data.user; // if authenticated, we should always find the User's information since we already guaranteed they exist
	} catch (err) {
		console.error({ error: "Cannot reach api endpoint for username", err });
	}

	// Pass data to the page via props
	return {
		props: {
			user,
			username,
			authenticated
		}
	};
}

export default Userpage;
