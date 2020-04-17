import styled from "styled-components";
import Head from "next/head";
import Topbar from "./Topbar";

const Wrapper = styled.main`
	min-height: 100vh;
	min-width: 100vw;
	display: flex;
	flex-direction: column;
`;

const Main = styled.section`
	background: ${(props) => props.color};
	display: flex;
	flex-direction: column;
	flex: 1; // fills the rest of the page after the Topbar
`;

// Combines the Head and Navbar components.
// Think of this as the shell around everything else in a page.
const Layout = ({ children, title = "Untitled 🤔", color = "white" }) => {
	return (
		<Wrapper>
			<Head>
				<title>{`${title} | Fit or Fail`}</title>
			</Head>
			<Topbar />
			<Main color={color}>
				{/* props.children contains all of the nodes in between the <Layout></Layout> tags.
					If not for the below line, nothing inside those tags would be rendered.
					This line just puts them into place. */}
				{children}
			</Main>
		</Wrapper>
	);
};

export default Layout;
