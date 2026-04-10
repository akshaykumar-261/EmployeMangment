import mongoose from "mongoose";

const startServer = async (app, PORT) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Data Base Connection Successfuly");

    // Sever Start
    app.listen(PORT, () => {
      console.log(`Server is running on, ${PORT}`);
    });
  } catch (error) {
    console.log("Data Base Connection Failed", error.message);
    process.exit(1);
  }
};

export default startServer;
