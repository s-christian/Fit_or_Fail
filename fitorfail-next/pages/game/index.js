import Layout from "../../components/Layout";
import Link from "next/link";
import { Button } from "reactstrap";
import styled from "styled-components";

const CenterWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const SelectionPanel = styled.div`
	background-color: white;
	border-radius: 3px;
	padding: 4rem 2rem;
	box-shadow: 0px 15px 20px 8px hsl(0, 0%, 17%);

	@media screen and (max-width: 600px) {
		border-radius: 0;
		width: 100%;
	}
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
		background-color: hsl(0, 0%, 17%);
	}
`;

function GameSelection() {
	// TODO:
	// Figure out how to do CSR to simply display the authenticated user's username at the top of the page (Welcome, <name>!).
	// I don't want the entire page to be SSR just to display the name.
	return (
		<Layout title="Game" color="#E100FF">
			<CenterWrapper>
				<SelectionPanel>
					<h1>Pick Your Gamemode</h1>
					<ButtonBox>
						<Link href="/game/solo">
							<StyledButton
								block
								outline
								size="lg"
								style={{ color: "hsl(156, 80%, 36%)" }}
							>
								Solo
							</StyledButton>
						</Link>
						<Link href="/game/online">
							<StyledButton
								block
								outline
								size="lg"
								style={{
									color: "hsl(186, 40%, 32%)",
									textDecoration: "line-through"
								}}
							>
								Online
							</StyledButton>
						</Link>
					</ButtonBox>
				</SelectionPanel>
			</CenterWrapper>
		</Layout>
	);
}

export default GameSelection;
