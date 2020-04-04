import Layout from "../../components/Layout";
import Link from "next/link";

function Game() {
	return (
		<Layout title="Game">
			<h1>Pick Your Gamemode</h1>
			<p>
				This page should only be accessible to users that are currently logged in. Not yet
				implemented.
			</p>
			<p>Buttons to pick Solo or Online</p>
			<p>
				<Link href="/game/solo">
					<a>Solo</a>
				</Link>{" "}
				<Link href="/game/online">
					<a>Online</a>
				</Link>
			</p>
		</Layout>
	);
}

export default Game;
