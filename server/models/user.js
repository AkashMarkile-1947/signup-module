const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastNAme: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

//genrates a json web token for a specified user with payload of id
userSchema.methods.genrateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "5d"});
    return token;
}

const User = mongoose.model("user", userSchema);
const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        eamil: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data);
}
module.exports = {
    User, validate
}
