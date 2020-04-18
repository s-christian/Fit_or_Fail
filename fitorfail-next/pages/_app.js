/* Resources:
 * https://www.youtube.com/watch?v=lhMKvyLRWo0
 */

import "bootstrap/dist/css/bootstrap.min.css"; //reactstrap styles
import { useState, useLayoutEffect, useMemo } from "react";
import axios from "axios";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import { UserContext } from "../components/UserContext";

// Example theme with color variables
const theme = {
	colors: {
		primary: "#0070f3"
	}
};

// This default export is required in a new `pages/_app.js` file.
// Also wraps everything in styled-components' ThemeProvider
const MyApp = ({ Component, pageProps }) => {
	// Using React's Context saves the state between Link routes, and gets reset on refreshes (including SSR pages, which cause a necessary "hard refresh").
	// Context makes information available to all child components inside the declared <UserContext.Provider> in the return statement below.

	const [userData, setUserData] = useState(null);

	// A way to cache the User information, so that userProvider does not change unless userData or setUserData changes.
	const userProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

	// The useLayoutEffect() hook operates client side (CSR), and doesn't paint the screen until it has finished. Effects always run after rendering.
	// This prevents "flickering" from dynamically hydrating the page after its first paint. This is for the case where we're adding the "Log out" button to the Topbar.
	// --- Please ignore all "Warning: useLayoutEffect does nothing on the server" errors, because the warnings don't apply to our use case of rendering the Topbar ---
	useLayoutEffect(() => {
		(async function fetchDecodedToken() {
			try {
				// Note to self: environment variables are not accessible on the client side, unless explicity defined in next.config.js
				const { data } = await axios.get(`${process.env.BASE_URL}/api/decodeToken`);
				if (data.decoded) setUserData(data.decoded);
				else if (!data.error) console.error("You should never see this!"); // has to have either "decoded" or "error" as per the API
			} catch (error) {
				console.log(error);
			}
		})(); // Immediately-invoked Function Expression (IIFE) syntax
	}, []); // With this empty array, we're saying the effect doesn't depend on any values from props or state, so it only runs on mount and unmount

	// This context stuff took me way too long to figure out since context is cleared on refreshes.
	// I have no idea if this is the most efficient way of doing things, but as far as I can tell, it's working fine,
	// and we now have essentially persistent global userData based on the User's token that's stored as a cookie upon login.
	// Hopefully this continues to work for whatever it might be needed for.

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
			</Head>
			<ThemeProvider theme={theme}>
				<SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
					<UserContext.Provider value={userProvider}>
						<Component {...pageProps} />
					</UserContext.Provider>
				</SWRConfig>
			</ThemeProvider>
		</>
	);
};

export default MyApp;
