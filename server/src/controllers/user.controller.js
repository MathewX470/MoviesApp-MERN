import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName, confirmPassword } = req.body;

    // Validate input
    if (!username || !password || !displayName || !confirmPassword) {
      return responseHandler.badRequest(res, "All fields are required");
    }
    if (password !== confirmPassword) {
      return responseHandler.badRequest(res, "Passwords do not match");
    }
    if (username.length < 8 || password.length < 8 || displayName.length < 8) {
      return responseHandler.badRequest(
        res,
        "All fields must be at least 8 characters"
      );
    }

    const checkUser = await userModel.findOne({ username });
    if (checkUser) {
      return responseHandler.badRequest(res, "Username already exists");
    }

    const user = new userModel();
    user.username = username;
    user.displayName = displayName; // Fixed: Corrected typo
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { sub: user.id }, // Changed: Use 'sub' for JWT convention
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, { token, ...user._doc, id: user.id });
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return responseHandler.badRequest(
        res,
        "Username and password are required"
      );
    }

    const user = await userModel
      .findOne({ username })
      .select("username id displayName password salt"); // Select necessary fields
    if (!user) {
      return responseHandler.badRequest(res, "User not found");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Invalid password");
    }

    const token = jsonwebtoken.sign(
      { sub: user.id }, // Changed: Use 'sub' for JWT convention
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Remove sensitive fields
    user.password = undefined;
    user.salt = undefined;

    responseHandler.ok(res, { token, ...user._doc, id: user.id }); // Changed: Use 200 OK for signin
  } catch (error) {
    responseHandler.error(res, error.message); // Fixed: Properly call error handler
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return responseHandler.badRequest(
        res,
        "Current and new password are required"
      );
    }
    if (newPassword.length < 8) {
      return responseHandler.badRequest(
        res,
        "New password must be at least 8 characters"
      );
    }

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) {
      return responseHandler.unauthorize(res, "User not found");
    }
    if (!user.validPassword(password)) {
      return responseHandler.unauthorize(res, "Invalid current password");
    }

    user.setPassword(newPassword);
    await user.save();

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password -salt");

    if (!user) {
      return responseHandler.notfound(res, "User not found");
    }

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

export default { signup, signin, updatePassword, getInfo };
