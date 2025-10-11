import { User } from '../models/User.mjs';

export const getUserProfile = async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select('-password');
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.json({
      message: 'Welcome to your profile!',
      user: user,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
