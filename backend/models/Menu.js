import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

export default mongoose.model('Menu', menuSchema);
