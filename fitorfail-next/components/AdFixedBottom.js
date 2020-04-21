import { Button, Container } from "reactstrap";
import styled, { css } from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const FixedBottom = styled.div`
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 20vh;
	background-color: hsla(206, 12%, 72%, 0.85);
	display: flex;
	align-items: center;

	// property, duration, timing-function, delay
	transition: 500ms linear;

	.container-lg {
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
	}

	${(props) => {
		if (props.display)
			return css`
				opacity: 1;
				transition: opacity 500ms linear;
			`;
		return css`
			opacity: 0;
			transition: opacity 500ms linear;
		`;
	}}

	@media screen and (max-height: 900px) {
		height: 30vh;
	}
`;

const Content = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid white;
	border-radius: 3px;
	color: black;
	padding: 0.5rem;

	&:hover {
		background-color: hsl(206, 12%, 72%);
		cursor: pointer;
	}

	@media screen and (max-width: 600px) {
		padding: 0.25rem;
	}
`;

const AdTitle = styled.h2`
	color: white;
	text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; // simulate a text stroke

	@media screen and (max-width: 600px) {
		font-size: 1.5rem;
	}
`;

const StyledImage = styled.img`
	height: 150px;

	@media screen and (max-height: 1200px) {
		height: 100px;
	}
`;

const XButton = styled(Button)`
	position: absolute;
	top: 1rem;
	right: 1rem;

	@media screen and (max-width: 600px) {
		top: 0px;
		right: 0px;
	}
`;

const AdFixedBottom = () => {
	// { title, image_url, message }
	const [ad, setAd] = useState(null);
	const [showAd, setShowAd] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`${process.env.BASE_URL}/api/ads`);
				if (!data.random_ad) console.error("Improper API response");
				setAd(data.random_ad);
				setShowAd(true);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	if (!ad)
		return (
			<FixedBottom display={showAd}>
				<Container fluid="lg">
					<Content>
						<h3>Cannot fetch ad</h3>
					</Content>
					<XButton close onClick={() => setShowAd(false)} />
				</Container>
			</FixedBottom>
		);

	// When ad is fetched
	return (
		<FixedBottom display={showAd}>
			<Container fluid="lg">
				<AdTitle>{ad.title}</AdTitle>
				<a href={ad.sponsor_url}>
					<Content>
						<StyledImage src={ad.image_url} />
						{ad.message && <p className="mt-2">{ad.message}</p>}
					</Content>
				</a>
				<XButton close onClick={() => setShowAd(false)} />
			</Container>
		</FixedBottom>
	);
};

export default AdFixedBottom;
