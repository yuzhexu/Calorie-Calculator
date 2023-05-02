import mongoose from "mongoose";

/*
 * User (object schema for the User element)
 */
const UserSchema = {
  userId: String,
  email: String,
  password: String,
};

//export the model and define table for mongoDB Atlas
export const User = mongoose.model("Users", UserSchema);
    