let express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const User = require('./user.js');
const connectDB = require("./db");
const Razorpay = require("razorpay");

dotenv.config();
connectDB();

let app = express();
const instance = new Razorpay({
    key_id: process.env.ID,
    key_secret: process.env.KEY_SECRET,
});
//Middlewares
app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//Routes
app.post("/api/payment/order", (req, res) => {
    params = req.body;
    instance.orders
        .create(params)
        .then((data) => {
            res.send({ sub: data, status: "success" });
        })
        .catch((error) => {
            res.send({ sub: error, status: "failed" });
        });
});

app.post("/api/payment/verify", (req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    var expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);
    var response = { status: "failure" };
    if (expectedSignature === req.body.razorpay_signature)
        response = { status: "success" };
    res.send(response);
});

app.post('/api/payment/register', async (req, res) => {
    const params = req.body;

    console.log(params);

    const user = await User.create(params);

    var response = {
        error: "true"
    }
    if (user) {
        response = {
            name: user.name,
            username: user.username,
            email: user.email
        }
    }

    res.send(response);

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server started");
});
