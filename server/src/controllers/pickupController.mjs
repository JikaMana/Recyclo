import { Pickup } from '../models/Pickup.mjs';

// POST /api/pickups
export const createPickupRequest = async (request, response) => {
  try {
    const { user, address, location, selectedTypes, imageUrl } = request.body;

    if (!address) {
      return response.status(400).json({ message: 'Address is required' });
    }
    if (!location) {
      return response.status(400).json({ message: 'Location is required' });
    }
    if (!imageUrl) {
      return response.status(400).json({ message: 'Image URL is required' });
    }
    if (!selectedTypes) {
      return response.status(400).json({ message: 'Recycle Type is required' });
    }

    console.log('Line 21', request.user);
    console.log('Line 22', request.body);

    const pickup = await Pickup.create({
      user: request.user ? request.user._id : null, // optional
      address,
      location,
      selectedTypes,
      imageUrl,
    });

    response.status(201).json({ success: true, pickup });
  } catch (err) {
    console.log(err);
    response
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// GET /api/pickups
export const getAllPickups = async (request, response) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    response.status(200).json(pickups);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
