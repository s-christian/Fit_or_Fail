import Meta from "./Meta";
import Navbar from "./Navbar";

// Combines the Meta and Navbar components.
// Think of this as the shell around everything else in a page.
const Layout = (props) => (
	<div className="container">
		<Meta title={props.title} />
		<Navbar />
		{/* props.children contains all of the nodes in between the <Layout></Layout> tags.
		If not for the below line, nothing inside those tags would be rendered.
		This line just puts them into place. */}
		{props.children}

		<style jsx>{`
			.container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		`}</style>
		<style jsx global>{`
			* {
				padding: 0;
				margin: 0;
				box-sizing: border-box;
				font-family: Arial, Helvetica, sans-serif;
			}

			body {
				background-color: lightgray;
			}

			h1,
			img {
				margin-bottom: 1rem;
			}

			h1,
			p {
				text-align: center;
			}
		`}</style>
	</div>
);

export default Layout;
