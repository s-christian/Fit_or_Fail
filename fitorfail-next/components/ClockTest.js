// Clock example taken from: https://reactjs.org/docs/state-and-lifecycle.html
// React.Component documentation: https://reactjs.org/docs/react-component.html

// This component is rendered Client-Side (CSR = Client-Side Rendering) as opposed to Server-Side (SSR = Server-Side Rendering).
// For more information, read over: https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	componentDidMount() {
		// tick() every 1000 milliseconds (one second).
		// Only this.props and this.state are protected. Can set any other keys. Below, for example, we are setting this.timerID.
		// Could also paste the code from tick() directly into this callback, it just looks cleaner if it calls another function to do it.
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date()
		});
	}

	// Called every time it updates
	render() {
		return (
			<div style={{ marginTop: "1rem", textAlign: "center" }}>
				<h2>
					This Clock test confirms that Next.js is able to use all default React functions
					and syntax.
					<br />
					Notice how we don't even have to explicity import React or React.Component!
					<br />
					<br />
					It is {this.state.date.toLocaleTimeString()}
				</h2>
			</div>
		);
	}
}

// ReactDOM.render(<Clock />, document.getElementById("root"));
export default Clock;
