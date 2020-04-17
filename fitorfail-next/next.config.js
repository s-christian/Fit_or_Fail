/* Resource:
 * https://akhilaariyachandra.com/environment-variables-in-next-js
 */

// Needed to modify this file to add support for environment variables
let Dotenv = null;
if (process.env.NODE_ENV !== "production") Dotenv = require("dotenv-webpack");

module.exports = {
	// Let our BASE_URL be accessible in client-side code
	env: {
		BASE_URL: process.env.BASE_URL
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Add the new plugin for environment variables to the existing webpack plugins
		if (process.env.NODE_ENV !== "production")
			config.plugins.push(new Dotenv({ silent: true }));

		return config;
	}
};
