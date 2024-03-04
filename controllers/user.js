const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.postSignup = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);

    // console.log(name, email, password);

    let user = new User({
      name: name,
      email: email,
      password: hash,
      totalExpense: 0,
      isPremium: false,
    });
    let result = await user.save();
    console.log(result);
    res.status(200).json({
      message: "User created successfully",
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong.",
    });
  }
};
exports.generateToken = (id, name, isPremium) => {
  return jwt.sign({ id, name, isPremium }, process.env.SECRET_KEY);
};
exports.postLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        error: "Invalid user details.",
      });
    }
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        error: "Incorrect password!",
      });
    }
    res.status(202).json({
      token: exports.generateToken(user.id, user.name, user.isPremium),
      message: "Successfully logged in! ",
    });
    
  } catch (error) {
    console.log(error);
  }
};
