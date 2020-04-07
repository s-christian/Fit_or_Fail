import styled from "styled-components";
import Head from "next/head";
import Topbar from "./Topbar";

const Wrapper = styled.main`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: ${(props) =>
		props.color}; // sets the background color of the entire page (even the space behind the navbar)
`;

const Main = styled.section`
	display: flex;
	flex-direction: column;
	flex-grow: 1; // fills the rest of the page after the Topbar
`;

// Combines the Meta and Navbar components.
// Think of this as the shell around everything else in a page.
const Layout = ({ children, title = "Untitled 🤔", color = "none" }) => (
	<Wrapper color={color}>
		<Head>
			<title>{`${title} | Fit or Fail`}</title>
		</Head>
		<Topbar />
		<Main>
			{/* props.children contains all of the nodes in between the <Layout></Layout> tags.
				If not for the below line, nothing inside those tags would be rendered.
				This line just puts them into place. */}
			{children}
		</Main>
	</Wrapper>
);

export default Layout;
