/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 */

import axios from "axios";

import Layout from "../../components/Layout";

// Component function only takes parameter "props" (passed by getServerSideProps())
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of ().
const Userpage = ({ user, searchedUsername }) => {
	// If user does not exist
	if (!user)
		return (
			<Layout title="User not found">
				<div className="container">
					<img src="/assets/images/user_not_found.png" />
					<h1>
						User <span id="username">{searchedUsername}</span> does not exist!
					</h1>

					{/* Temporary CSS styling */}
					{/* <style jsx>{`
						.container {
							display: flex;
							align-items: center;
							justify-content: center;
						}

						#username {
							color: white;
							font-weight: 900;
							text-shadow: 2px 2px gray;
						}
					`}</style> */}
				</div>
			</Layout>
		);

	// If user exists
	// TODO: When someone goes to /users/CHRISTIAN and user "Christian" is found,
	// change the URL to be the accurate username (/users/Christian).
	return (
		<Layout title={`${user.username} · player info`}>
			<div className="container">
				<img src={user.profile_picture_url} alt={`${user.username}'s profile picture`} />
				<h1 id="username">{user.username}</h1>
				<p>Points: {user.points}</p>
				<p>Wins: {user.wins}</p>
				<p>Team: {user.team}</p>
				<p>Member since: {user.register_date}</p>
				<p>Account type: {user.account_type}</p>

				{/* Temporary CSS styling */}
				{/* <style jsx>{`
					.container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 500px;
						height: 500px;
						background-color: lightgreen;
						border-radius: 5%;
						border: 2px solid black;
					}

					#username {
						color: white;
						font-weight: 900;
						text-shadow: 2px 2px gray;
					}
				`}</style> */}
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

	let data = { user: "" };
	try {
		// host is localhost:3000 in development
		const res = await axios.get(`http://${context.req.headers.host}/api/users/${username}`);
		// axios returns a large JSON object with all the request and response information.
		// We only need the data from the 'data' field that it returns. This contains the API's response.
		// Only change the value of data if the server responded with found user data
		if (res.data.user) data = res.data;
	} catch (err) {
		console.error({ msg: "Cannot reach api endpoint", err });
	}

	// Note to self: When logging an object (such as the JSON data below), the object has to be the only parameter.
	// Why? Ex: 'console.log("user: " + user)' results in an output of "user: [object Object]".
	// Correct: console.log(user);

	// Pass data to the page via props
	return {
		props: {
			user: data.user,
			searchedUsername: username
		}
	};
}

export default Userpage;
