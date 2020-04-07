import Topbar from "../components/Topbar";
import { useState } from "react";

function Test() {
	// Declare a new state variable "count" and set its initial value to 0
	const [count, setCount] = useState(0);
	console.log("test");
	console.log(res);
	console.log(req);

	return (
		<>
			<Topbar />
			<h1>This page to be used to test new stuff</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me!</button>
		</>
	);
}

export default Test;
