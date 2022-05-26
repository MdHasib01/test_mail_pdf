let express = require("express");
let app = express();
const path = require("path");
const cors = require("cors");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const { METHODS } = require("http");

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

nodemailer.createTransport({
  host: "email.ney.vai@gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "Md Hasib",
    pass: "email@420",
  },
});
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email.ney.vai@gmail.com",
    pass: "email@420",
  },
});
// verifying the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    // console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});
// const instance = new Razorpay({
//   key_id: "rzp_test_UcE06rfvrv9izC",
//   key_secret: "KPcUFY2Xcbbt3xn32jriR6Ea",
// });

app.post("/access", (req, res) => {
  // new METHODS
  //   instance.paymentLink.create({
  //     amount: 50000,
  //     currency: "INR",
  //     accept_partial: true,
  //     first_min_partial_amount: 100,
  //     description: "For XYZ purpose",
  //     customer: {
  //       name: "Gaurav Kumar",
  //       email: "md.hasibuzzaman001@gmail.com",
  //       contact: 919999999999,
  //     },
  //     notify: { sms: false, email: true },
  //     reminder_enable: true,
  //     notes: { policy_name: "Jeevan Bima" },
  //     callback_url: "http://localhost:3000/",
  //     callback_method: "get",
  //   });

  const email = "call2mec@gmail.com";
  // const email =  req.body.email;
  console.log(req.body);
  const message = "Your bill for the service is : 300$";
  const link = "http://localhost:3000/payment/1";
  const content = `${message} \n Please check the attached invoice below for the more details \n click the link to pay the bills: ${link} `;
  //   console.log(message);
  const mail = {
    from: "'MD' <email.ney.vai@gmail.com>",
    to: email,
    subject: "checking email",
    // message: message,
    text: content,
    attachments: [
      {
        filename: "Bill.pdf",
        path: path.join(__dirname, "./Bill.pdf"),
        contentType: "application/pdf",
      },
    ],
  };

  const result = transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
      // console.log(res);
    }
  });
});

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello From nodemailer server");
});
app.listen(PORT, () => console.info(`server has started on ${PORT}`));
