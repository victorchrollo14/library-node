import { User } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

// authenticate the user
const userLogin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ error: "User Does not exist, Register first" });
      return;
    }

    const hashPass = user.password;
    const isPassword = bcrypt.compareSync(password, hashPass);
    if (!isPassword) {
      res.status(400).json({ error: "wrong password, retry again" });
      return;
    }

    req.session.user = user;
    res.status(200).json({ message: "successfully logged In" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// loggin out users
const userLogout = async (req, res) => {
  const currentUser = req.session.user;
  try {
    if (currentUser) {
      const { name } = currentUser;

      req.session.destroy();
      res.status(200).json({ name: name });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// registering a new user
const userSignUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email.toLowerCase();
  const [password, passwordConfirm] = [
    req.body.password,
    req.body.passwordConfirm,
  ];

  const isValidPass = checkPassword(password, passwordConfirm);
  if (!isValidPass) {
    res.status(400).json({ error: "Passwords does not match" });
    return;
  }

  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    res.status(400).json({ error: "Not a Valid Email" });
    return;
  }

  const isStrongPass = validator.isStrongPassword(password, {
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minLowercase: 1,
  });

  if (!isStrongPass) {
    res.status(400).json({
      error: `Yo Weakling, set a Strong password which has a minimum of 8 characters, 
         1 symbol, number, uppercase and lowercase character`,
    });
    return;
  }

  const isUser = await User.exists({ email: email });
  if (isUser) {
    res.status(400).json({ error: `${email} is already registered` });
    return;
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: `${name}, you are successfully registered. You can login now`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// check if user is logged in
const checkLogin = async (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json({ login: true });
      return;
    }
    res.status(200).json({ login: false });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// check matching passwords
const checkPassword = (p1, p2) => {
  if (p1 === p2) {
    return true;
  }
  return false;
};

export { userSignUp, userLogin, userLogout, checkLogin };
