let express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const User = require('./user.js');
const connectDB = require("./db");
const sendEmail = require('./email.js');

dotenv.config();
connectDB();

let app = express();
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

app.post('/api/payment/findUser2', async(req, res) => {
  const { transaction } = req.body;

  try {
    const user = await User.findOne({"transaction": transaction});
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
  const {name, email, college, transaction} = req.body;

  var referralCode = "linuxdiary3";
  for(const i of email) {
    if(i === '@') break;
    referralCode += i;
  }


  try {

  const user = await User.create({
    name,
    email,
    college,
    transaction,
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
      referralCode: referralCode,
      emailSent: "true"
    }

    // console.log(user);

    try {
      var message = `<p>Dear ${user.name},</p><p>We are reaching out to thank you for registering for our national event - <strong>"LINUXDIARY 3.0"</strong> that will be held on September 3rd and 4th 2022, in Walchand College of Engineering, Sangli.</p><p>Please feel free to share the event as we want as many talented people as possible.</p><p>Your Referral Code : <strong>${referralCode}</strong></p><p>Thank you again, and have a great day.</p><br/><p>Regards,<br/>Walchand Linux Users' Group.</p>`;
      console.log(message);
      sendEmail(user.email, "Thank You For Registering For LINUXDIARY 3.0", message);

    } catch (err) {
      // console.log(err);
      response = {
        error: "true",
        emailSent: "false"
      }
    }

  }

  // console.log(response);
  res.send(response);

} catch(err) {
  var response = {
    error: "true"
  }
  // console.log("Mai Yaha Bhi Hu");
  res.send(response);
}

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started");
});
