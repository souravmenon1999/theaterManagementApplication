import mongoose from 'mongoose';
const { Schema } = mongoose;

const theaterOwnerListSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  googleID: String,
});

const TheaterOwnerList = mongoose.model('TheaterOwnerList', theaterOwnerListSchema);

export default TheaterOwnerList;
