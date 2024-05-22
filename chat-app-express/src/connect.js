var mongoose = require('mongoose');
// DB connection
const initiateDBConnection = () => {
    mongoose.connect(process.env.DBLINK).then(() => console.log('MongoDB connected')).catch(err => console.error(err));
}

module.exports = { initiateDBConnection };