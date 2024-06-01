import mongoose from "mongoose";

export default async function connectToDatabase() {
  mongoose.connect(`${process.env.DB}`).catch((error) => console.log(error));
}