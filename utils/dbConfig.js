import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    if (isConnected) {
      console.log("==========================");
      console.log("| DB is already connected |");
      console.log("==========================");

      return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("=======================>");

    isConnected = true;
    console.log("===========================");
    console.log("| DB connection established |");
    console.log("===========================");
  } catch (error) {
    console.log("===============================");
    console.log("| this is error on db connection |");
    console.log("===============================");
  }
};
