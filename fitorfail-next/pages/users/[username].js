/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 * https://github.com/zeit/swr#ssr-with-nextjs
 */

//import useSWR from "swr";
import axios from "axios";
import cookies from "next-cookies";
import Router from "next/router";

import Layout from "../../components/Layout";

// Component function only takes parameter "props" (passed by getServerSideProps())
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of ().
const Userpage = ({ user, searchedUsername, authenticated }) => {
	// If user does not exist, return that the user was not found
	if (!user)
		return (
			<Layout title="User not found">
				<div className="container">
					<img src="/assets/images/user_not_found.png" />
					<h1>
						User <span id="username">{searchedUsername}</span> does not exist!
					</h1>
				</div>
			</Layout>
		);

	// If user exists

	// ISSUE USING SWR: Data is cleared from page on refocus, even though supposedly none of the data was touched! Something to do with rendering it?
	// Have to at least temporarily disallow revalidation on focus.
	// const initialUserInfo = user;
	// const { data } = useSWR(`${process.env.BASE_URL}/api/users/username/${searchedUsername}`, {
	//	revalidateOnFocus: false,
	// 	initialData: initialUserInfo
	// });

	return (
		<Layout title={`${user.username} · player info`}>
			<div className="container">
				{authenticated && <h3>YOU ARE LOGGED IN!</h3>}
				<img src={user.profile_picture_url} alt={`${user.username}'s profile picture`} />
				<h1 id="username">{user.username}</h1>
				<p>Points: {user.points}</p>
				<p>Wins: {user.wins}</p>
				<p>Team: {user.team}</p>
				<p>Member since: {user.register_date}</p>
				<p>Account type: {user.account_type}</p>
			</div>
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
