const Users = require("../Models/UserModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  try {
    const { userName, email, passWord } = req.body;

    const userNameCheck = await Users.findOne({ userName });

    if (userNameCheck) {
      return res.json({ message: "UserName Already Taken", status: false });
    }

    const emailCheck = await Users.findOne({ email });

    if (emailCheck) {
      return res.json({ message: "Email Already In-Use", status: false });
    }

    const hashedPassWord = await bcrypt.hash(passWord, 10);

    await Users.create({
      userName,
      email,
      passWord: hashedPassWord,
    });

    return res.json({ status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { userName, passWord } = req.body;

    const user = await Users.findOne({ userName }).lean();

    if (!user) {
      return res.json({ message: "Invalid UserName", status: false });
    }

    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);

    if (!isPasswordValid) {
      return res.json({ message: "Invalid Credentials", status: false });
    }

    delete user.passWord;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
