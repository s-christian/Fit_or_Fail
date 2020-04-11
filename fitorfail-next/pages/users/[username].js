/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 * https://github.com/zeit/swr#ssr-with-nextjs
 */

import axios from "axios";
import cookies from "next-cookies";
import { useState } from "react";
import styled, { css } from "styled-components";
import Layout from "../../components/Layout";

const ProfileBox = styled.div`
	text-align: center;
`;
const ColorSelector = styled.div`
	margin-top: 5rem;
	text-align: center;

	& input {
		padding: 0.25rem;
	}
`;
//this component includes colors and padding to fallback on for older web browsers.
const UIcard = styled.div`
	align-self: center;
	margin-top: 10vh;
	border: 1px solid black;
	height: 75%;
	width: 50%;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background: #fc4a1a;
	background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);
	background: linear-gradient(to right, #f7b733, #fc4a1a);

	// Make the box slimmer on small screens (phones)
	@media screen and (max-width: 600px) {
		margin-top: 5%;
		height: 90%;
		width: 90%;
		overflow: scroll;
	}
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
// Component function only takes parameter "props" (passed by getServerSideProps())
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of ().

const Userpage = ({ user, searchedUsername, authenticated }) => {
	// This creates a "color" variable within the component with a default value of "Orange", and "setColor" is used to change this value
	const [color, setColor] = useState("orange");
	// This is the function used to change the color, after a certain "event" ("e" for short) is passed to it.
	const handleColor = (e) => {
		// e.target.value says, "give me the event, give me the target of that event (the actual DOM element that called it, like <input>), and give me that target's value".
		// It then sets our "color" variable to whatever the value of that target is. In this case, it's the color that the user types into the input box.
		setColor(e.target.value);
	};

	// Object that holds all our style data
	// Not currently needed since we're only concerned with the background-color, which we need to pass to Layout
	// const styleObj = {
	// 	backgroundColor: color
	// };

	//
	// USER DOES NOT EXIST
	//
	if (!user)
		return (
			<Layout title="User not found" color={color}>
				<UIcard>
					<ProfileBox>
						<ProfilePicture notFound src="/assets/images/oopsNoExist.jpg" />
						<h1>
							User <span id="username">{searchedUsername}</span> does not exist!
						</h1>
					</ProfileBox>
					<ColorSelector>
						<h4>Backgound Color: {color}</h4>
						<div className="ui search">
							<input type="text" onChange={handleColor} value={color} />
						</div>
					</ColorSelector>
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

	//
	// USER EXISTS
	//
	return (
		<Layout title={`${user.username} · player info`} color={color}>
			<UIcard>
				<ProfileBox>
					{authenticated && <h3>YOU ARE LOGGED IN!</h3>}
					<ProfilePicture
						src={user.profile_picture_url}
						alt={`${user.username}'s profile picture`}
					/>
					<h1 id="username">{user.username}</h1>
					<p>Points: {user.points}</p>
					<p>Wins: {user.wins}</p>
					<p>Team: {user.team}</p>
					<p>Member since: {user.register_date}</p>
					<p>Account type: {user.account_type}</p>
				</ProfileBox>
				<ColorSelector>
					<h4>Color: {color}</h4>
					<div className="ui search">
						<input type="text" onChange={handleColor} value={color} />
					</div>
				</ColorSelector>
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
	let userInfo = false;

	const { token } = cookies(context);
	let authenticated = false;

	if (token) {
		try {
			const tokenData = await axios.post(`${process.env.BASE_URL}/api/decodeToken`, {
				token
			});
			const tokenInfo = tokenData.data.decoded;
			// Need to check if the page being served is the one that belongs to the authenticated user.
			if (tokenInfo.username === username) authenticated = true;
		} catch (err) {
			console.error({ error: "Cannot reach api endpoint for decodeToken", err });
		}
	}

	// Retrieve the User's information. If the User is authenticated to their own profile page, the userInfo will also contain their email address.
	try {
		const userData = await axios.post(
			`${process.env.BASE_URL}/api/users/username/${username}`,
			{ authenticated }
		);
		if (userData.data.user) userInfo = userData.data.user; // if authenticated, we should always find the User's information since we already guaranteed they exist
	} catch (err) {
		console.error({ error: "Cannot reach api endpoint for username", err });
	}

	// Pass data to the page via props
	return {
		props: {
			user: userInfo,
			searchedUsername: username,
			authenticated: authenticated
		}
	};
}

export default Userpage;
