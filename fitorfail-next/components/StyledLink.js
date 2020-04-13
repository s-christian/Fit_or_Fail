import styled from "styled-components";
import Link from "next/link";

const StyledAnchor = styled.a`
	text-decoration: underline;
	color: white;
	&:hover {
		color: ${(props) => props.hoverColor};
	}
`;

const StyledLink = ({ href, hoverColor = "hsl(87, 77%, 54%)", children }) => {
	return (
		<Link href={href} passHref>
			<StyledAnchor hoverColor={hoverColor}>{children}</StyledAnchor>
		</Link>
	);
};

export default StyledLink;
