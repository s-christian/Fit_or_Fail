import Layout from "../../components/Layout";
import Link from "next/link";
import { Button } from "reactstrap";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";

const CenterWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const SelectionPanel = styled.div`
	max-width: 700px;
	background-color: white;
	border-radius: 3px;
	padding: 2rem;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);

	@media screen and (max-width: 600px) {
		border-radius: 0;
		width: 100%;

		& h1 {
			font-size: 2rem;
		}
		& h3 {
			font-size: 1rem;
		}
	}
`;

const PanelHeading = styled.div`
	border: 1px 1px 0 1px solid black;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	font-size: 2rem;
	font-weight: 300;
	background-color: hsla(0, 0%, 100%, 0.8);
	width: 100%;
	text-align: center;
	border-bottom: 1px solid hsl(0, 0%, 17%);
	margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledButton = styled(Button)`
	font-size: 1.5rem;
	font-weight: 600;

	&:hover {
		color: white !important;
		background-color: palevioletred;
	}
`;

const Contribute = () => {
	const { userData } = useContext(UserContext);

	return (
		<Layout title="Contribute" color="palevioletred">
			<CenterWrapper>
				<SelectionPanel>
					<PanelHeading>
						{/* Takes time for the userData to load */}
						WELCOME, {userData ? userData.username.toUpperCase() : "USER"}
					</PanelHeading>
					<h1>Contribute Center</h1>
					<h3>
						Below are the links to everything that you can contribute directly to the
						site.
					</h3>
					<ButtonBox>
						<Link href="/contribute/questions">
							<StyledButton
								block
								outline
								size="lg"
								style={{ color: "hsl(156, 80%, 36%)" }}
							>
								Questions
							</StyledButton>
						</Link>
						<Link href="/contribute/ads">
							<StyledButton
								block
								outline
								size="lg"
								style={{
									color: "hsl(186, 40%, 32%)",
									textDecoration: "line-through"
								}}
							>
								Ads
							</StyledButton>
						</Link>
					</ButtonBox>
				</SelectionPanel>
			</CenterWrapper>
		</Layout>
	);
};

export default Contribute;
