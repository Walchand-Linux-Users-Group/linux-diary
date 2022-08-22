let express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const User = require('./user.js');
const connectDB = require("./db");
const Razorpay = require("razorpay");
const shortid = require('shortid');
const sendEmail = require('./email.js');

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
app.get("/register", (req, res) => {
  res.render("register", { key: process.env.ID });
});

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

app.post('/api/payment/findUser', async(req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({"email": email});
    if(user) {
      res.send({ sub: user, status: "failed"});
    } else {
      res.send({ status: "success" });
    }
  } catch(e) {
    res.send({ status: "success" });
  }
})

app.post('/api/payment/incrementReferral', async(req, res) => {
  const { referralCode = "idontknow" } = req.body;

  try {
    const user = await User.findOne({"referralCode": referralCode});
    user.referralCount += 1;
    await user.save();
    res.send({ status: "success" });
  } catch(e) {
    res.send({ status: "failed" });
  }
})

app.post('/api/payment/register', async (req, res) => {
  const {name, email, college} = req.body;

  const referralCode = shortid.generate();

  // console.log(params);

  try {

  const user = await User.create({
    name,
    email,
    college,
    referralCode
  });

  var response = {
    error: "true"
  }
  if(user) {
    response = {
      name: user.name,
      email: user.email,
      error: "false",
      referralCode: referralCode
    }

    try {
      var message = `Dear ${user.name},\nWe are reaching out to thank you for registering to our national event - "LINUXDIARY 3.0" that will be held on 3rd and 4th of September, 2022 in Walchand College of Engineering, Sangli. \n\nPlease feel free to share the event as we want as many talent like you.\nYour Referral Code : ${referralCode}\n\nThank you again, and have a great day.\nRegards,\nWalchand College of Engineering.`;
      console.log(message);
      sendEmail(user.email, "Thank You For Registering For LINUXDIARY 3.0", message);
      // response = {
      //   esent: "true"
      // }

    } catch (err) {
      
    }

  }

  res.send(response);

} catch(err) {
  var response = {
    error: "true"
  }
  res.send(response);
}

  

  

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started");
});
