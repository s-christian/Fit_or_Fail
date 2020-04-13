import Layout from "../../components/Layout";
import StyledLink from "../../components/StyledLink";

const Questions = () => {
	return (
		<Layout title="Contribute" color="palevioletred">
			<div className="text-center mt-5">
				<h1>Contribute Center</h1>
				<p style={{ color: "purple" }}>
					Below are the links to everything that you - as an admin or government official
					- can contribute directly to the site.
					<br />
					<StyledLink href="/contribute/questions">Questions</StyledLink>
				</p>
			</div>
		</Layout>
	);
};

export default Questions;
