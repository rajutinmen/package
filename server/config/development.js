module.exports = {
	port: "3000",
	mongodb: {
		url: 'mongodb://heroku_7qsnwmb9:ag5kfal0j3sumln94g3pk3kipf@ds139501-a0.mlab.com:39501,ds139501-a1.mlab.com:39501/heroku_7qsnwmb9?replicaSet=rs-ds139501',
		username: "tinmen",
		password: "tinmen@1234"
	},
	orderStatus: ['requested', 'atHub', 'dispatched', 'closed'],
};
