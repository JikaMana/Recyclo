import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// mongoose
//   .connect('mongodb://localhost/recyclo')
//   .then(() => console.log('Connected to Database'))
//   .catch((err) => console.log(`MongoDB connection error: ${err.message}`));
