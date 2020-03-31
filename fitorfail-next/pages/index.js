import Layout from "../components/Layout";
import Link from "next/link";

function Index() {
	return (
		<Layout title="Welcome">
			<h1>Fit or Fail!</h1>
			<p>This is where we put the giant PLAY button and such</p>
			<Link href="/testing">
				<a>Link to testing page</a>
			</Link>
		</Layout>
	);
}

export default Index;
