import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Map,
    of: Number, // Assuming each item ID maps to a quantity number
    default: {}
}
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
