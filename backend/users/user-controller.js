const { UserModel, RoleModel, OrganizationModel } = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt-helper');
const passport = require('passport');

exports.signup = async (req, res) => {
  try {
    const { user_id, username, emailId, password, role_id, org_id , org_name , role_name} = req.body;

    const existingUser = await UserModel.findOne({ $or: [{ user_id }, { emailId }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID or Email ID already exists. Please choose a different one.' });
    }

    if (!user_id || !username || !emailId || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      user_id,
      username,
      emailId,
      password: hashedPassword,
      role_id,
      org_id,
      org_name,
      role_name
    });

    const data = await newUser.save();
    console.log(data);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Check if the user is active
    if (!user.active) {
      return res.status(403).json({ message: 'User account is inactive. Please contact support.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwtUtils.generateToken({ id: user._id });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const user = req.user;
    let responseData = [];

    switch (user.role_id) {
      case 1: // Admin role
        responseData = await UserModel.find({});
        break;

      case 2: // Role with specific organization
        responseData = await UserModel.find({ org_id: user.org_id });
        break;

      case 3: // Regular user
        responseData = [user]; // Wrap current user in array
        break;

      default:
        return res.status(400).json({ message: 'Invalid role_id.' });
    }

    // Format response data uniformly
    responseData = responseData.map(user => ({
      username: user.username,
      user_id: user.user_id,
      emailId: user.emailId,
      role_name: user.role_name,
      org_name: user.org_name
    }));

    loginPerson = { username: user.username,
      user_id: user.user_id,
      emailId: user.emailId,
      role_name: user.role_name,
      org_name: user.org_name}

    res.status(200).json({loginPerson , users: responseData });
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
