const UserSchema = require("../models/userSchemaModel");
const UserOtp = require("../models/useOtpSchemaModel");
const nodemailer = require("nodemailer");

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.createUsers = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      error: "Please enter all inputs!!",
    });
  }
  try {
    const preUser = await UserSchema.findOne({ email: email });
    if (preUser) {
      res.status(400).json({
        status: "fail",
        error: "User already exists",
      });
    } else {
      const newUser = await UserSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: req.body.createdAt,
      });

      return res.status(200).json({
        status: "success",
        data: { newUser },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: "fail",
      message: error.message,
    });
  }
};

exports.createOtp = async (req, res) => {
  const { email } = req.body;

  console.log(email, "this is email for otp>>>>");
  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  //now we will check if the entered email is present in our db or not
  try {
    const preUser = await UserSchema.findOne({ email: email });

    if (preUser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await UserOtp.findOne({ email: email });
      if (existEmail) {
        const updateData = await UserOtp.findByIdAndUpdate({ _id: existEmail._id }, { otp: OTP }, { new: true });
        // await updateData.save();
        res.status(200).json({ status: "successfully updated otp", updateData });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For OTP Validation",
          text: `OTP:- ${OTP}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error>>", error);
            res.status(400).json({
              error: "email not send",
            });
          } else {
            console.log("email sent successfully", info.response);
            res.status(200).json({
              status: "success",
              message: "email sent successfully",
            });
          }
        });
      } else {
        const saveOtp = await UserOtp.create({
          email,
          otp: OTP,
          createdAt: req.body.createdAt,
        });

        res.status(200).json({
          status: "success",
          saveOtp,
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For OTP Validation",
          text: `OTP:- ${OTP}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error>>", error);
            res.status(400).json({
              error: "email not send",
            });
          } else {
            console.log("email sent successfully", info.response);
            res.status(200).json({
              status: "success",
              message: "email sent successfully",
            });
          }
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        error: "This User Doesn't Exist In Database",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Invalid Details",
      error,
    });
  }
  {
  }
};

// exports.createOtp = async (req, res) => {
//   const { email } = req.body;

//   console.log(email, "this is email for otp>>>>");
//   if (!email) {
//     return res.status(400).json({ error: "Please Enter Your Email" });
//   }

//   try {
//     const preUser = await UserSchema.findOne({ email: email });

//     if (!preUser) {
//       return res.status(400).json({
//         status: "fail",
//         error: "This User Doesn't Exist In Database",
//       });
//     }

//     const OTP = Math.floor(100000 + Math.random() * 900000);

//     let existEmail = await UserOtp.findOne({ email: email });
//     if (!existEmail) {
//       existEmail = await UserOtp.create({
//         email,
//         otp: OTP,
//         createdAt: req.body.createdAt,
//       });
//     } else {
//       existEmail.otp = OTP;
//       await existEmail.save();
//     }

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Sending Email For OTP Validation",
//       text: `OTP:- ${OTP}`,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("error>>", error);
//         return res.status(400).json({
//           error: "email not send",
//         });
//       } else {
//         console.log("email sent successfully", info.response);
//         return res.status(200).json({
//           status: "success",
//           message: "email sent successfully",
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(400).json({
//       error: "Invalid Details",
//       error,
//     });
//   }
// };
