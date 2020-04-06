const jwt = require("jsonwebtoken");

/**
 * Issue a JWT containing the User id, and set a cookie containing the token.
 * @param {Request} req
 * @param {Response} res
 * @param {Document} user
 */
function issueToken(req, res, user) {
	// All information in a JWT is PUBLIC, meaning anybody can read the contents of the token if they know it. Don't store sensitive information.
	// JWTs contain three sections of information: Header, Payload, Signature
	jwt.sign(
		{ id: user.id },
		process.env.JWT_SECRET,
		{ expiresIn: 7200 }, // expires in two hours
		(err, token) => {
			if (err) throw err;
			// set cookie containing token, with secure cookie options
			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // makes it only work on HTTPS when in production
				sameSite: "strict",
				maxAge: 7200000, // same expiration for our JWT, but this uses milliseconds
				path: "/"
			}).status(201);
			res.json({
				user: {
					_id: user.id,
					username: user.username,
					username_lower: user.username_lower,
					email: user.email,
					profile_picture_url: user.profile_picture_url,
					points: user.points,
					wins: user.wins,
					team: user.team,
					account_type: user.account_type,
					register_date: user.register_date
				}
			});
		}
	);
}

module.exports = issueToken;
