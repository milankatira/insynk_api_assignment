const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  };

module.exports = {
  register,login
};
