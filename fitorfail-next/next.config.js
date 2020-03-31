/* Resource:
 * https://akhilaariyachandra.com/environment-variables-in-next-js
 */

// Needed to modify this file to add support for environment variables

const Dotenv = require("dotenv-webpack");

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Add the new plugin for environment variables to the existing webpack plugins
		config.plugins.push(new Dotenv({ silent: true }));

		return config;
	}
};
