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

const ProfileBox = styled.div`
	border-right: 1px solid black;
	// "flex: 1;" is equivalent to "flex-basis: 0; flex-grow: 1; flex-shrink: 1;"
	flex: 1;
	background-color: gray;

	@media screen and (max-width: 900px) {
		border-right: none;
		border-bottom: 1px solid black;
		flex: 0;
	}
`;
const ProfileBoxContents = styled.div`
	margin: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Stats = styled.div`
	padding: 0.5rem;
	width: 250px;
	border: 1px solid black;
	background-color: hsla(0, 0%, 100%, 0.75);
`;
const InfoBox = styled.div`
	display: flex;
	flex: 3;
	align-items: center;
	justify-content: center;
	color: white;
	font-family: consolas;
	font-size: 2rem;

	@media screen and (max-width: 900px) {
		flex: 1;
	}
`;
const ColorSelector = styled.div`
	text-align: center;
	margin-top: 1rem;

	& input {
		padding: 0.25rem;
	}
`;
//this component includes colors and padding to fallback on for older web browsers.
const UIcard = styled.div`
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	//background: #fc4a1a;
	//background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);
	//background: linear-gradient(to right, #f7b733, #fc4a1a);

	// Make the box slimmer on small screens (phones)
	@media screen and (max-width: 900px) {
		flex-direction: column;
	}
	//@media screen and (max-width: 600px) {
	//}
`;
const ProfilePicture = styled.img`
	height: 250px;
	width: 250px;
	border-radius: 50%;
	margin-right: auto;
	border: 1px solid black;

	${(props) =>
		props.notFound &&
		css`
			border: 1px solid white;
		`}
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
	background-color: rgba(255, 255, 255, 0.6);
	border: 5px solid white;

	font-size: 2rem;

	& #username {
		color: white;
		text-shadow: 2px 2px 4px black;
		font-weight: 700;
	}
`;

// Component function only takes parameter "props" (passed by getServerSideProps() in this case)
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of (), where () signifies "immediately return this value".
const Userpage = ({ user, username, authenticated }) => {
	// --- USER DOES NOT EXIST ---
	if (!user)
		return (
			<Layout title="User not found" color="orange">
				<UIcard>
					<NotFoundWrapper>
						<NotFound>
							<img src="/assets/images/user_not_found.png" />
							<h1>
								User <span id="username">{username}</span> does not exist!
							</h1>
						</NotFound>
					</NotFoundWrapper>
				</UIcard>
			</Layout>
		);

	// I'm really only leaving this commented chunk here to use as an example for later pages. Don't forget to import useSWR.
	// ISSUE USING SWR: Data is cleared from page on refocus, even though supposedly none of the data was touched! Something to do with rendering it?
	// Have to at least temporarily disallow revalidation on focus.
	// const initialUserInfo = user;
	// const { data } = useSWR(`${process.env.BASE_URL}/api/users/username/${searchedUsername}`, {
	//	revalidateOnFocus: false,
	// 	initialData: initialUserInfo
	// });

	// --- USER EXISTS ---
	// This creates a "color" variable within the component with a default value of "Orange", and "setColor" is used to change this value
	const [color, setColor] = useState("orange");
	// This is the function used to change the color, after a certain "event" ("e" for short) is passed to it.
	const handleColor = (e) => {
		// e.target.value says, "give me the event, give me the target of that event (the actual DOM element that called it, like <input>), and give me that target's value".
		// It then sets our "color" variable to whatever the value of that target is. In this case, it's the color that the user types into the input box.
		setColor(e.target.value);
	};

	return (
		<Layout title={`${user.username} · player info`} color={color}>
			<UIcard>
				<ProfileBox>
					<ProfileBoxContents>
						{authenticated && <h3>YOU ARE LOGGED IN!</h3>}
						<div>
							<ProfilePicture
								src={user.profile_picture_url}
								alt={`${user.username}'s profile picture`}
							/>
						</div>
						<h1 id="username">{user.username}</h1>
						<Stats>
							<p>Points: {user.points}</p>
							<p>Wins: {user.wins}</p>
							<p>Team: {user.team}</p>
							<p>Member since: {dayjs(user.register_date).format("MM/DD/YYYY")}</p>
							<p>Account type: {user.account_type}</p>
						</Stats>
						<ColorSelector>
							<h4>Color: {color}</h4>
							<div className="ui search">
								<input type="text" onChange={handleColor} value={color} />
							</div>
						</ColorSelector>
					</ProfileBoxContents>
				</ProfileBox>
				<InfoBox>
					<p>Test</p>
				</InfoBox>
			</UIcard>
		</Layout>
	);
};

// Marks the page to be server-side rendered on every request
export async function getServerSideProps(context) {
	// 'context' contains a bunch of information.
	// We're extracting the dynamic route 'params' from 'context'.
	// In our case, we only care about the username from our dynamic route.
	// We use this username to send a POST request to the API on our backend (POST because we're passing data to the API)
	// to get all of that User's information in order to populate the page.

	const { username } = context.params;
	let user = null;

	const { token } = cookies(context);
	let authenticated = false;

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
