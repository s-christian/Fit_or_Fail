import Layout from "../components/Layout";
import Link from "next/link";

function Index() {
	return (
		<Layout title="Log in">
			<h1>Log in</h1>
			<p>Login form goes here</p>
			<p>
				Don't have an account?{" "}
				<Link href="/register">
					<a> Register one!</a>
				</Link>
			</p>
		</Layout>
	);
}

export default Index;
