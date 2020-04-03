import Head from "next/head";
import Topbar from "./Topbar";

// Combines the Meta and Navbar components.
// Think of this as the shell around everything else in a page.
const Layout = ({ children, title = "Untitled 🤔" }) => (
	<>
		<Head>
			<title>{`${title} | Fit or Fail`}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		</Head>
		<Topbar />
		{/* props.children contains all of the nodes in between the <Layout></Layout> tags.
		If not for the below line, nothing inside those tags would be rendered.
		This line just puts them into place. */}
		{children}
	</>
);

export default Layout;
