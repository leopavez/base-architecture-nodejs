module.exports = {
  mongo: {
    reconnectionInterval: process.env.MONGO_RECONNECTION_INTERVAL || 3000,
  },
};
