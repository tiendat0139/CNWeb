import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { findUserByEmail, getUserGoogle } from "../services/users.services";
import User from "../models/User";

export const oauthController = async (req, res) => {
  const { code } = req.query;
  const data = await getUserGoogle(code);

  /* Get userinfo */
  const { id_token } = data;
  const userInfo = jwtDecode(id_token);
  /* Check email exist */
  const user = await findUserByEmail(userInfo.email);
  
  /* generate access token */
  var accessToken;
  if (!user) {
    const newUser = new User({
      name: userInfo.name,
      email: userInfo.email,
      password: "randompassword",
      avatar: userInfo.picture
    });
    await newUser.save();
    accessToken = jwt.sign(
      { userId: newUser._id, name: newUser.name, avatar: newUser.avatar, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10y" }
    );
  } else {
    accessToken = jwt.sign(
      { userId: user._id, name: user.name, avatar: user.avatar, email: user.email},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10y" }
    );
  }

  /* redirect cline */
  const urlRedirect = `${process.env.CLIENT_REDIRECT_CALLBACK}?access_token=${accessToken}`;
  return res.redirect(urlRedirect);
};
