import { compare, hash } from 'bcryptjs';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    phone: String,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zipcode: String,
    },
    avatar: String,
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password on save if modified
UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

// Check if password matches database password
UserSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};
