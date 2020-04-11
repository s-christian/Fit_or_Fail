/* Resources:
 * https://nextjs.org/docs/basic-features/pages
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://github.com/zeit/next.js/issues/9524
 * https://github.com/zeit/swr#ssr-with-nextjs
 */


import axios from "axios";
import cookies from "next-cookies";
import React, { useState } from "react";
import styled, {} from "styled-components";
import Layout from "../../components/Layout";

const ContainerWrapper = styled.div`
	margin:auto;
	width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
	font-size: 16px;
	position: fixed;
`;
const ProfileBox = styled.div`
text-align:center;
`
const Header = styled.div`
margin-bottom: 20px;

`
//this component includes colors and padding to fallback on for older web browsers.
const UIcard = styled.div`
border:1px solid black;
height:75%;
width:60%;
overflow:scroll;
justify-content:center;
align-items:center;
margin-bottom: 100px;
padding: 20px;
background: #fc4a1a; 
background: -webkit-linear-gradient(to right,
    #f7b733,
    #fc4a1a); 
background: linear-gradient(to right, 
    #f7b733, 
    #fc4a1a); 
`;
// Component function only takes parameter "props" (passed by getServerSideProps())
// Notice that this is a function that does stuff other than immediately return HTML data.
// I need to check if the user exists or not in order to deliver the correct HTML content,
// so I start this function with the proper {} instead of ().

   
const Userpage = ({ user, searchedUsername, authenticated }) => {
//this is the array. first input is the current color, the second is the color to be. useState is the current state
	const [color, setColor] =useState('Orange');
//this component is the changee handler. it takes any event and sets color to that value
    const onChangeHandler = e => {
     //code below is making set color the target value (input value in text box)
        setColor(e.target.value);
		}; 
		//component used to turn the background color to the new value(color gets set to setcolor in useState)
    const styleObj = {
        background: color
		};
		
	if (!user)
		return (
			<Layout title="User not found"> 
				<ContainerWrapper style={styleObj}>
					<UIcard>
						<ProfileBox>
							<img
							src="/assets/images/DefaultPPic.jpg"
							style={{
								height: "250px",
								borderRadius: "60%",
								marginRight: "auto",
								border: "1px solid white",
							}}
							/>
							<h1>
								User <span id="username">{searchedUsername}</span> does not exist!
							</h1>
						</ProfileBox>
							<Header>Backgound Color: {color}
                            <div className="ui search">
                                <input
                                type="text"
                                onChange={onChangeHandler}
                                value={color}  
                                />
                            </div>
                        	</Header>
					</UIcard>
				</ContainerWrapper>	
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
		<Layout title={`${data.username} · player info`}>
         
				<ContainerWrapper style={styleObj}> 
					<UIcard>	
						<ProfileBox>
						{authenticated && <h3>YOU ARE LOGGED IN!</h3>}
						<img src={data.profile_picture_url} alt={`${data.username}'s profile picture`}
						style={{
								height: "250px",
								borderRadius: "60%",
								marginRight: "0.5rem",
								border: "1px solid black",
								justifyContent: "center",
								alignItems: "center"
							}}
							 />
							<h1 id="username">{user.username}</h1>
							<p>Points: {user.points}</p>
							<p>Wins: {user.wins}</p>
							<p>Team: {user.team}</p>
							<p>Member since: {user.register_date}</p>
							<p>Account type: {user.account_type}</p>
							</ProfileBox>
							<Header>Color: {color};
								<div className="ui search">
									<input
									type="text"
									onChange={onChangeHandler}
									value={color} 
									/>
								</div>
							</Header>	
					</UIcard>
				</ContainerWrapper> 	
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
