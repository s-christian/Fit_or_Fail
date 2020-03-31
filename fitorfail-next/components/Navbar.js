import Link from "next/link";

const Navbar = () => (
	<div className="navbarStyle">
		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="/about">
					<a>About</a>
				</Link>
			</li>
			<li>
				<Link href="/game">
					<a>Play</a>
				</Link>
			</li>
			<li>
				<Link href="/leaderboard">
					<a>Leaderboard</a>
				</Link>
			</li>
			<li>
				<Link href="/login">
					<a>Login</a>
				</Link>
			</li>
			<li>
				<Link href="/users/Christian">
					<a>Test: existing user profile page</a>
				</Link>
			</li>
			<li>
				<Link href="/users/loremipsum">
					<a>Test: non-existant user profile page</a>
				</Link>
			</li>
			<li>
				<Link href="/users/CHRISTIAN">
					<a>Test: case-insensitive username match</a>
				</Link>
			</li>
		</ul>

		{/* Really bad temporary CSS styling */}
		{/* Also this is the only way to write comments within JSX, I figured out */}
		<style jsx>{`
			.navbarStyle {
				width: 100vw;
				height: 100px;
				border-bottom: 4px solid gray;
				background-color: black;
				margin-bottom: 2rem;
			}

			ul {
				height: 100%;
				list-style: none;
				display: flex;
				align-items: center;
				justify-content: space-around;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 1.4rem;
			}

			a {
				color: white;
				text-decoration: none;
			}

			a:hover {
				color: gray;
				transition: 200ms;
			}

			a:active {
				color: red;
			}
		`}</style>
	</div>
);

export default Navbar;
