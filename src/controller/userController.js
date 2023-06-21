import { User } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

// authenticate the user
const userLogin = async (req, res) => {
  console.log(req.body);
};

// registering a new user
const userSignUp = async (req, res) => {
  const name = req.body.fullname;
  const email = req.body.email.toLowerCase();
  const [password, passwordConfirm] = [
    req.body.password[0],
    req.body.password[1],
  ];

  const isValidPass = checkPassword(password, passwordConfirm);
  if (!isValidPass) {
    res.status(400).json({ error: "Passwords does not match" });
  }

  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    res.status(400).json({ error: "Not a Valid Email" });
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
      message: `Yo Weakling, set a Strong password which has a minimum of 8 characters, 
         1 symbol, number, uppercase and lowercase character`,
    });
  }

  const isUser = await User.exists({ email: email });
  if (isUser) {
    res.status(400).json({ error: `${email} is already registered` });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
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
    res.json(400).json({ error: err.message });
  }
};

// check matching passwords
const checkPassword = (p1, p2) => {
  if (p1 === p2) {
    return true;
  }
  return false;
};

export { userSignUp, userLogin };
