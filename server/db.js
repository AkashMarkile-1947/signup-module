const  mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
       // useNewUrlParse: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database Successfully")
    } catch (error) {
        console.log(error, "Couldn't connect to database!");
    }
};