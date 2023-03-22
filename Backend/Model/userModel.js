import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password must be greater than 6 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "qam", "qac", "Staff"],
    default: "Staff",
  },
  department: {
    type: String,
    default: null,
  },
  viewIdeas: [
    {
      idea_id: { type: mongoose.Schema.Types.ObjectId },
      isLike: Boolean,
      isDislike: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
export default User;
