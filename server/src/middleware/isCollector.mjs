export const isCollector = (request, response, next) => {
  if (request.user.role !== 'collector') {
    return response
      .status(403)
      .json({ message: 'Forbidden: You do not have permission' });
  }
  next();
};
