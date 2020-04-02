import { useState } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import styled, { css } from "styled-components";

const Topbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const StyledNavbar = styled(Navbar)`
		background-color: hsl(119, 0%, 95%);
	`;

	const TopbarLink = styled.a`
		text-decoration: none;
		font-weight: 700;
		color: #212121;
		&:hover {
			text-decoration: none;
			color: hsl(189, 67%, 49%);
		}

		/* This function allows you to pass this component keywords to provide different CSS styling. */
		/* In this case, any TopbarLink with "primary" results in a custom style. */
		${(props) =>
			props.primary &&
			css`
				color: hsl(189, 78%, 39%);
				font-weight: 900;
				font-size: 1.25rem;
			`}
	`;

	return (
		// The second "light" is the color scheme for the hamburger icon
		<StyledNavbar light expand="md">
			<NavbarBrand>
				<Link href="/" passHref>
					<TopbarLink primary>Fit or Fail</TopbarLink>
				</Link>
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink>
							<Link href="/game" passHref>
								<TopbarLink>Play!</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/about" passHref>
								<TopbarLink>About</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/leaderboard" passHref>
								<TopbarLink>Leaderboard</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/users/Christian" passHref>
								<TopbarLink>Test: User Christian</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/users/loremipsum" passHref>
								<TopbarLink>Test: User loremipsum</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/users/CHRISTIAN" passHref>
								<TopbarLink>Test: User CHRISTIAN</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</StyledNavbar>
	);
};

export default Topbar;
