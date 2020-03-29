import Head from "next/head";

// Used to automatically set the tab's title using Next's default Head component.
// Transforms the need for the below code, to a simple: <Meta title="title_here" />
const Meta = props => (
	<Head>
		<title>{`${props.title} | Fit or Fail`}</title>
	</Head>
);

export default Meta;
