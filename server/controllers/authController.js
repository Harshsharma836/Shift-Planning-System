const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password, role , timeZone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt

    const user = new User({ email, password: hashedPassword, role, timeZone  });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');

     // saving the user id in req.user so we can use it later in getting shift and all.
     const decodedToken = jwt.decode(token);
     req.user = { id: decodedToken.userId };

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

module.exports = { register, login };
