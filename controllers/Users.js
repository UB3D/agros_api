import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "kota", "password"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, kota, email, role, password } = req.body;
  // if (password !== confPassword)
  //   return res
  //     .status(400)
  //     .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      kota: kota,
      email: email,
      role: role,
      password: hashPassword,
    });
    res.json({ msg: "register success" });
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};
export const Edit = async (req, res) => {
  const { id, name, kota, email, role, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.update(
      {
        name: name,
        kota: kota,
        email: email,
        role: role,
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ msg: "edit data success" });
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};
export const Remove = async (req, res) => {
  const { id } = req.body;

  try {
    await Users.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "delete data success" });
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "wrong password" });
    const userId = user[0].id;
    // console.log(userId);
    const name = user[0].name;
    const email = user[0].email;
    const kota = user[0].kota;
    const accessToken = jwt.sign(
      { userId, name, email, kota },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
    console.log(error);
  }
};
