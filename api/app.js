const express = require("express");
const ErrorHandler = require("./middleware/error")
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors({
    origin: [`http://localhost:5173`],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello World, Till When")
});

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"config/.env"
    })
}

//import routes
const user = require("./controller/user")
const payment = require("./controller/payment")
const property = require("./controller/property")
const booking = require("./controller/booking")
const residence = require("./controller/residence")
const event = require("./controller/event")

app.use("/api/v2/user", user)
app.use("/api/v2/payment", payment)
app.use("/api/v2/property", property)
app.use("/api/v2/booking", booking)
app.use("/api/v2/residence", residence)
app.use("/api/v2/event", event)

app.use(ErrorHandler);

module.exports = app;