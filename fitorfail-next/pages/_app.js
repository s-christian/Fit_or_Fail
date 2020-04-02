import "bootstrap/dist/css/bootstrap.min.css"; //reactstrap styles
import { ThemeProvider } from "styled-components";

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
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default MyApp;
