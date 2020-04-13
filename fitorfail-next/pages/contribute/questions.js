// UI for government personnel or admins to add or delete questions from the question pool
// Display a list of all questions by ID
// Questions will have IDs that span 1, 2, ... , n. These will NOT be the actual Question _ids, but rather a convenience for the end user.
// The IDs will be assigned based on whichever Question was fetched first, and it will be laid out on the page.
// The actual value of that Question will be its _id to be used to pass to the API for deletion.
// After deleting a question, subtract 1 from all Questions that come after that one:
//     1, 2, ... , k , k+1 , ... , n => 1, 2, ... , k ,  ... , n-1
// Then rerender the list of questions, add a loading spinny maybe (at least add an "isLoading" state while fetching the list of questions).

// Add a button on an authenticated User's profile page to navigate to this page, if they're a gov or admin
// Ex: "Click here to modify the question pool!" It's a privileged action.

import Layout from "../../components/Layout";
import StyledLink from "../../components/StyledLink";

const Questions = () => {
	return (
		<Layout title="Questions Center" color="#55dd99">
			<div className="text-center mt-5">
				<h1>Questions Center</h1>
				<p>
					This area will be filled with all the questions currently in our database.
					<br />
					It will also contain input boxes for submitting your own questions (along with
					their answer choices and the correct answer) directly to our database.
					<br />
					<StyledLink href="/contribute" hoverColor="red">
						Back to Contribute Center
					</StyledLink>
				</p>
			</div>
		</Layout>
	);
};

export default Questions;
