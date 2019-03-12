
module.exports = function (env) {
	console.log("webpack env: ", env);
	return require(`./webpack.${env}.config.js`)(env);
};