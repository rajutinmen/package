module.exports = {
	port: "3000",
	mongodb: {
		url: 'mongodb://dev:i20fever@stagingcluster-shard-00-00-toe7q.mongodb.net:27017,stagingcluster-shard-00-01-toe7q.mongodb.net:27017,stagingcluster-shard-00-02-toe7q.mongodb.net:27017/mpStaging?ssl=true&replicaSet=stagingCluster-shard-0&authSource=admin',   //dev
		username: "tinmen",
		password: "tinmen@1234"
	},
	orderStatus: ['requested', 'atHub', 'dispatched', 'closed'],
};
