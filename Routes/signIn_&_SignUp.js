const express = require("express");
const router = express.Router();
const sendEmail = require("../Functions/sendEmail");
const { v4: uuidv4 } = require("uuid");
const User = require("../Models/user");
const { encrypt, decrypt } = require("../Functions/encryptAndDecrypt");

router.post("/signUp", async (req, res) => {
  if (!req.body.email || !req.body.fullName || !req.body.password) {
    res.send({ message: "All Fields are required" });
  } else {
    const pass = encrypt(req.body.password);
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.send({ message: "User with same email already exist" });

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: pass,
      userId: uuidv4(),
      userType: req.body.userType,
    });

    user
      .save()
      .then(async (result) => {
        const email = req.body.email;
        const data = sendEmail(email, req.body.password);
        res.send({
          statusCode: 200,
          message: "user is created successfully",
        });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({ userType: "2" });
    res.send({ statusCode: 200, users });
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteuser", async (req, res) => {
  const { userId } = req.body;
  try {
    await User.deleteOne({ userId });
    res.send({ statusCode: 200 });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.send({ message: "Both Fields are required" });
  } else {
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.send({
          statusCode: 400,
          message: "user with given email does not exist",
        });
      else {
        let pass = decrypt(user.password);
        if (pass == password) {
          return res.send({
            statusCode: 200,
            message: "Login successfully",
            isAuthenticated: user.isAuthenticated,
            userId: user.userId,
            userType: user.userType,
          });
        } else {
          return res.send({
            statusCode: 302,
            message: "Password is incorrect",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
module.exports = router;
