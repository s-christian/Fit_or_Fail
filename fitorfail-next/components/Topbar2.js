import { useState } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import styled, { css } from "styled-components";

const StyledNavbar = styled(Navbar)`
	background-color: white;
	border-bottom: 1px solid black;
`;

const TopbarLink = styled.a`
	padding: 0rem 1rem;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 1.25rem;
	font-weight: 700;
	color: #212121;

	&:hover {
		text-decoration: none;
		color: hsl(189, 67%, 49%);
		transition: 100ms;
	}

	/* This function allows you to pass this component keywords to provide different CSS styling. */
	/* In this case, any TopbarLink with "primary" results in a custom style. */
	${(props) =>
		props.primary &&
		css`
			padding: 0;
			display: inline-block;
			line-wrap: no-wrap;
			color: hsl(189, 78%, 39%);
			font-weight: 900;
			font-size: 2.25rem;
		`}
`;

const CenteredNav = styled(Nav)`
	display: flex;
	align-items: center;
`;

const TopbarPlay = styled(TopbarLink)`
	background-color: hsl(0, 75%, 60%);
	border: 2px solid hsl(0, 0%, 13%);
	padding: 0.5rem 2.5rem;
	border-radius: 3px;
	font-weight: 800;
	color: white;

	&:hover {
		color: hsl(0, 75%, 60%);
		background-color: white;
		transition: 300ms;
		border-color: hsl(189, 78%, 39%);
	}
`;

const Topbar2 = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		// The second "light" is the color scheme for the hamburger icon
		<StyledNavbar light expand="md">
			<Link href="/" passHref>
				<TopbarLink primary>
					{/* Maybe just a temporary image, but it looks nice */}
					<img
						src="/assets/images/fitorfail_logo_small.jpg"
						alt="Fit or Fail logo"
						style={{
							height: "40px",
							borderRadius: "50%",
							marginRight: "0.5rem",
							border: "1px solid black"
						}}
					/>
					Fit or Fail
				</TopbarLink>
			</Link>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<CenteredNav className="ml-auto" navbar>
					<Link href="/about" passHref>
						<TopbarLink>About</TopbarLink>
					</Link>

					<Link href="/leaderboard" passHref>
						<TopbarLink>Leaderboard</TopbarLink>
					</Link>

					<Link href="/users/Christian" passHref>
						<TopbarLink>Test: User Christian</TopbarLink>
					</Link>

					<Link href="/users/loremipsum" passHref>
						<TopbarLink>Test: User loremipsum</TopbarLink>
					</Link>

					<Link href="/users/CHRISTIAN" passHref>
						<TopbarLink>Test: User CHRISTIAN</TopbarLink>
					</Link>

					<Link href="/login" passHref>
						<TopbarLink>Log in</TopbarLink>
					</Link>

					<a href="/game" style={{ textDecoration: "none" }}>
						<TopbarPlay as="button">Play!</TopbarPlay>
					</a>
				</CenteredNav>
			</Collapse>
		</StyledNavbar>
	);
};

export default Topbar2;