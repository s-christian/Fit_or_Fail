import Meta from "./Meta";
import Topbar from "./Topbar";

// Combines the Meta and Navbar components.
// Think of this as the shell around everything else in a page.
const Layout = (props) => (
	<>
		<Meta title={props.title} />
		<Topbar />
		{/* props.children contains all of the nodes in between the <Layout></Layout> tags.
		If not for the below line, nothing inside those tags would be rendered.
		This line just puts them into place. */}
		{props.children}
	</>
);

export default Layout;
