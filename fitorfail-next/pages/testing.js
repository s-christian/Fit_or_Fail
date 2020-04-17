import Topbar from "../components/Topbar";
import { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const Test = () => {
	// Declare a new state variable "count" and set its initial value to 0
	const [count, setCount] = useState(0);
	const { userData, setUserData } = useContext(UserContext);

	return (
		<>
			<Topbar />
			<h1>This page to be used to test new stuff</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me!</button>
			<p>{JSON.stringify(userData)}</p>
		</>
	);
};

export default Test;
