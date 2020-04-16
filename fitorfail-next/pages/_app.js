import "bootstrap/dist/css/bootstrap.min.css"; //reactstrap styles
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import axios from "axios";

// Example theme with color variables
const theme = {
	colors: {
		primary: "#0070f3"
	}
};

// This default export is required in a new `pages/_app.js` file.
// Also wraps everything in styled-components' ThemeProvider
const MyApp = ({ Component, pageProps }) => {
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
					<Component {...pageProps} />
				</SWRConfig>
			</ThemeProvider>
		</>
	);
};

export default MyApp;
