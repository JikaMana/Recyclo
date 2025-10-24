import mongoose, { Schema } from 'mongoose';

const PickupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    address: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    selectedTypes: {
      type: [String],
      default: [],
    },
    imageUrl: String,
    status: {
      type: String,
      enum: ['pending', 'collected', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Pickup = mongoose.model('Pickup', PickupSchema);
