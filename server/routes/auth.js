//login Route
const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");


router.post("/", async(req, res) => {
    try {
      const {error} = validate(req.body);
      if (error) {
        return res.status(400).send({message: error.details[0].message});
      }
      const user = await User.findOne({ email: req.body.email});
      if (!user) {
        return res.status(401).send({message: "invalid Email or Password"});
      }
      const validPassWord = await bcrypt.compare(req.body.password, user.password);
      if (!validPassWord) {
        return res.status(401).send({message: "invalid Email or Password"});
      }
      const token = user.genrateAuthToken();
      res.status(200).send({data: token, message: "Logged in Succesfully"})
    } catch(error) {
        res.status(500).send("Internal Server Error");
    }   
})


const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });

    return schema.validate(data);
}

module.exports = router;