import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Statistics = () => {
	const [apiResponse, setApiResponse] = useState(null);
	const [apiURL, setApiURL] = useState(null);

	function handleChoice(event) {
		setApiURL(event.target.value);
	}

	async function getStats() {
		try {
			const { data } = await axios.get(
				`${process.env.BASE_URL}/api/userStatistics/${apiURL}`
			);
			if (!data || data.err) return setApiResponse(err);
			setApiResponse(data);
		} catch (err) {
			setApiResponse({ err });
		}
	}

	return (
		<Layout title="Site Statistics" color="pink">
			<h1>Statistics available to gov/admin users</h1>
			<div style={{ backgroundColor: "gray", width: "50vw", height: "50vh" }}>
				<div>
					Choose the data to retrieve:
					<label htmlFor="registrations">
						<input
							type="radio"
							id="registrations"
							name="dataType"
							value="registrations"
							onClick={handleChoice}
						/>
						Registrations
					</label>
					<label htmlFor="scores">
						<input
							type="radio"
							id="scores"
							name="dataType"
							value="scores"
							onClick={handleChoice}
						/>
						Scores
					</label>
					<button onClick={getStats}>Get Stats</button>
				</div>
				<div>
					<p>{JSON.stringify(apiResponse)}</p>
				</div>
			</div>
		</Layout>
	);
};

export default Statistics;
