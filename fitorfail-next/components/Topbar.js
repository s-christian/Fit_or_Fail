import { useState, useContext, memo } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import styled, { css } from "styled-components";
import { UserContext } from "../components/UserContext";

const StyledNavbar = styled(Navbar)
`
	background-color: white;
	border-bottom: 1px solid black;
`;

const TopbarLink = styled.a `
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

const Logo = styled.img`
	box-sizing: border-box;
	padding: 1px;
	border: 1px solid black;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	margin-right: 0.5rem;
`;

const ProfilePic = styled(Logo)`
	margin-right: 0;
	margin-left: 0.5rem;
`;

const LogoutContainer = styled(NavLink)`
	width: 10rem;
	box-sizing: border-box;
	padding: 0.25rem 1rem;
	margin-right: 1rem;
	margin-left: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: hsl(199, 69%, 64%);
	border: 1px solid black;
	border-radius: 3px;

	& a:hover {
		color: white;
	}
`;

// The topbar throws some nasty errors since TopbarLink is inside either a NavbarBrand or NavLink;
// both of which are ultimately anchor tags, which means an <a> is inside of an <a>, and that's
// not allowed. I tried to reformat it to get rid of those occurrences, but I can't figure out how
// to do so and make it look the same. It doesn't break anything, but still try to fix it if you want.
const Topbar = () => {
	const { userData } = useContext(UserContext);

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		// The second "light" is the color scheme for the hamburger icon
		<StyledNavbar light expand="md">
			<NavbarBrand>
				<Link href="/" passHref>
					<TopbarLink primary>
						<Logo
							src="/assets/images/fitorfail_logo_svg.png"
							alt="Fit or Fail logo"
							style={{}}
						/>
						Fit or Fail
					</TopbarLink>
				</Link>
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<CenteredNav className="ml-auto" navbar>
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
							<Link href="/users/Christian2" passHref>
								<TopbarLink>Test: User Christian2</TopbarLink>
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
							<Link href="/users/CHRISTIAN2" passHref>
								<TopbarLink>Test: User CHRISTIAN2</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link href="/donate" passHref>
								<TopbarLink style={{ color: "palevioletred" }}>Donate</TopbarLink>
							</Link>
						</NavLink>
					</NavItem>
					{!!userData ? (
						<NavItem>
							<LogoutContainer style={{}}>
								<Link href="/logout" passHref>
									<TopbarLink style={{ display: "inline-block" }}>
										Log out
									</TopbarLink>
								</Link>
								<Link href={`/users/${userData.username}`}>
									<a>
										<ProfilePic
											src={`${userData.profile_picture_url}`}
											alt={`${userData.username}'s profile picture`}
										/>
									</a>
								</Link>
							</LogoutContainer>
						</NavItem>
					) : (
						<NavItem>
							<NavLink>
								<Link href="/login" passHref>
									<TopbarLink>Log in</TopbarLink>
								</Link>
							</NavLink>
						</NavItem>
					)}
					<NavItem>
						<NavLink>
							<a href="/game" style={{ textDecoration: "none" }}>
								<TopbarPlay as="button">Play!</TopbarPlay>
							</a>
						</NavLink>
					</NavItem>
				</CenteredNav>
			</Collapse>
		</StyledNavbar>
	);
};

// Memoization saves us unnecessary re-renders whenever state changes in a component Topbar is part of.
export default memo(Topbar);