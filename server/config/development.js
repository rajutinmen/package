module.exports = {
	port: "3000",
	mongodb: {
		url: 'mongodb://localhost:27017/packaging',
		username: "tinmen",
		password: "tinmen@1234"
	},
	orderStatus: ['requested', 'atHub', 'dispatched', 'closed'],
};
