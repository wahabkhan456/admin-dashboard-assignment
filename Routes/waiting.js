const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const Waiting = require("../Models/waiting");

router.post("/putuser", async (req, res) => {
  const { fullName, userId, companyName } = req.body;

  if (!fullName || !companyName) {
    res.send("All fields are required");
  }

  const user = await User.findOne({ userId: userId });
  let updatedRecord = {
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    userType: user.userType,
    isAuthenticated: 2,
  };

  try {
    await User.updateOne({ userId: userId }, { $set: updatedRecord });
    const wait = new Waiting({
      fullName: fullName,
      companyName: companyName,
      userId: userId,
    });
    const n = await wait.save();
    res.send({ statusCode: 200, message: "Successfully Saved" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const records = await Waiting.find();
    res.send({ statusCode: 200, records });
  } catch (err) {
    console.log(err);
  }
});

router.get("/approve", async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ userId: userId });
    let updatedRecord = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      userType: user.userType,
      isAuthenticated: 3,
    };
    await User.updateOne({ userId: userId }, { $set: updatedRecord });
    await Waiting.deleteOne({ userId: userId });
    res.send({ statusCode: 200, message: "Successfully Saved" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/reject", async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ userId: userId });
    let updatedRecord = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      userType: user.userType,
      isAuthenticated: 1,
    };
    await User.updateOne({ userId: userId }, { $set: updatedRecord });
    await Waiting.deleteOne({ userId: userId });
    res.send({ statusCode: 200, message: "Successfully Saved" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
