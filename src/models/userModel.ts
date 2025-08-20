import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    default:''
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  role: {
    type: String,
    enum: ['tenant', 'landlord', 'admin'],
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
}, {
  discriminatorKey: 'role',
  timestamps: true
});

export const UserModel = mongoose.model('UserModel', UserSchema)
