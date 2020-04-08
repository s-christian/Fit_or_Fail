/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 * https://github.com/zeit/swr#ssr-with-nextjs
 */

import useSWR from "swr";
import axios from "axios";

import Layout from "../../components/Layout";

// Component function only takes parameter "props" (passed by getServerSideProps())
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of ().
const Userpage = ({ user, searchedUsername }) => {
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
	// ISSUE: Data is cleared from page on refocus, even though supposedly none of the data was touched! Something to do with rendering it?
	// Have to at least temporarily disallow revalidation on focus.
	const initialUserInfo = user;
	const { data } = useSWR(`http://localhost:3000/api/users/${searchedUsername}`, {
		initialData: initialUserInfo,
		revalidateOnFocus: false
	});

	return (
		<Layout title={`${data.username} · player info`}>
			<div className="container">
				<img src={data.profile_picture_url} alt={`${data.username}'s profile picture`} />
				<h1 id="username">{data.username}</h1>
				<p>Points: {data.points}</p>
				<p>Wins: {data.wins}</p>
				<p>Team: {data.team}</p>
				<p>Member since: {data.register_date}</p>
				<p>Account type: {data.account_type}</p>
			</div>
		</Layout>
	);
};

// Marks the page to be server-side rendered on every request
export async function getServerSideProps(context) {
	// 'context' contains a bunch of information.
	// We're extracting the dynamic route 'params' from 'context'.
	// In our case, we only care about the username from our dynamic route.
	// We use this username to send a GET request to the API on our backend
	// to get all of that user's information in order to populate the page.
	const { username } = context.params;

	// By default, we say that we have not found any user data
	let userData = false;
	try {
		// host is localhost:3000 in development
		// axios returns a "response", and we're pulling the data out of it
		const { data } = await axios.get(`${process.env.BASE_URL}/api/users/username/${username}`);
		if (data.user) userData = data.user;
	} catch (err) {
		console.error({ error: "Cannot reach api endpoint", err });
	}

	// Note to self: When logging an object (such as the JSON data below), the object has to be the only parameter.
	// Why? Ex: 'console.log("user: " + user)' results in an output of "user: [object Object]".
	// Correct: console.log(user);

	// Pass data to the page via props
	return {
		props: {
			user: userData,
			searchedUsername: username
		}
	};
}

export default Userpage;
