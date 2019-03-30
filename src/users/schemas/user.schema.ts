import * as mongoose from 'mongoose';
import { hash } from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  password: String,
});

// Hash password on save if modified
UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});
