import mongoose from "mongoose";

const startServer = async (server, PORT) => {
  const port = PORT || process.env.PORT || 5000;
  /*there should be default port or value check if not provided*/
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Data Connected Successfully");
  } catch (error) {
    console.log("Data Base Connection Failed", error.message);
    process.exit(1);
  }
  try {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Server failed to start", error.message);
    /*how can we so sure that db connection failed and no other error while starting app*/
    process.exit(1);
  }
};

export default startServer;
