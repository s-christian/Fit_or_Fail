import styled from "styled-components";
import Link from "next/link";

const StyledAnchor = styled.a`
	text-decoration: underline;
	color: white;
	&:hover {
		color: hsl(87, 77%, 54%);
	}
`;

const StyledLink = (props) => {
	return (
		<Link href={props.href} passHref>
			<StyledAnchor>{props.children}</StyledAnchor>
		</Link>
	);
};

export default StyledLink;
