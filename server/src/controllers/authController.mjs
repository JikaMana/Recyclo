import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.mjs';

const saltRounds = 10;

export const register = async (request, response) => {
  try {
    const { name, email, number, password, role } = request.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return response
        .status(400)
        .json({ message: 'Email already exists', user: existingUser });

    //hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, number, password: hashed, role });
    await user.save();

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
    };

    response
      .status(201)
      .json({ message: 'User registered successfully', user: userResponse });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const login = async (request, response) => {
  try {
    const { name, email, number, password, role } = request.body;

    const user = await User.findOne({ email });
    if (!user) return response.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    response.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
