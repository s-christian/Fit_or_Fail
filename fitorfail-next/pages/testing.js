import Layout from "../components/Layout";
import { useState } from "react";

function Test() {
	// Declare a new state variable "count" and set its initial value to 0
	const [count, setCount] = useState(0);

	return (
		<Layout title="Test page">
			<h1>This page to be used to test new stuff</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me!</button>
		</Layout>
	);
}

export default Test;
