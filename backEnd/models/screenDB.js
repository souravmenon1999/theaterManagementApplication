import mongoose from 'mongoose';
const { Schema } = mongoose;

// Section Schema
const SectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

// Main Seat Matrix Schema
const SeatMatrixSchema = new Schema({
  screenName: {
    type: String,
    required: true,
  },
  seatMatrix: {
    type: [[String]], // 2D array of strings representing seat labels (e.g., "1A1", "2A2")
    required: true,
  },
  sections: {
    type: [SectionSchema], // Array of section objects
    required: true,
  },
});

// Create a Mongoose model
const SeatMatrix = mongoose.model('SeatMatrix', SeatMatrixSchema);

export default SeatMatrix;
