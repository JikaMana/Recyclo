import jwt from 'jsonwebtoken';
import { User } from '../models/User.mjs';

export const auth = async (request, response, next) => {
  const authHeaders = request.headers.authorization;
  const token = authHeaders && authHeaders.split(' ')[1];

  if (!token)
    return response
      .status(401)
      .json({ message: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (err) {
    response.status(403).json({ message: 'Invalid token' });
  }
};
