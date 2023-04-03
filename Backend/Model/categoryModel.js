import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("category", CategorySchema);
export default Category;
