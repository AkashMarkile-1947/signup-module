require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//db connection 
connection();

//middleware 
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);



const port = process.env.PORT || 8080;
app.listen(port, console.log(`server running on ${port}`));