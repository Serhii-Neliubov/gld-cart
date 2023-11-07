import mongoose, { Document, Model, Schema } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  _id: string;
  type: string;
  name: string;
  surname: string;
  email: string;
  picture: string;
  password: string;
  passwordResetToken: string | undefined;
}

const userSchema: Schema<IUser> = new Schema({
  type: {
    type: String,
    required: [true, "Client's type is undefined"],
  },
  name: {
    type: String,
    required: [true, "Please, enter your first name"],
  },
  surname: {
    type: String,
    required: [true, "Please, enter your last name"],
  },
  email: {
    type: String,
    required: [true, "Please, enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please, enter a valid email"],
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please, enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  passwordResetToken: {
    type: String,
  },
});

const User: Model<IUser> = mongoose.model("User", userSchema) as Model<IUser>;
export default User;
