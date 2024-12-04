import mongoose from 'mongoose';
const { Schema } = mongoose;
 // Import the correct model name

const theaterListSchema = new Schema({
  theaterName: String,
  address: String,
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TheaterOwnerList', // Ensure this matches the export name in theaterOwner.js
  },
  screenIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screen', // Use the correct model name here
  }],
});

const TheaterList = mongoose.model('TheaterList', theaterListSchema);

export default TheaterList;
