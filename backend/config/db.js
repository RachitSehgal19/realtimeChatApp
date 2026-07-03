import dns from "dns";
import mongoose from "mongoose";

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected");
    } catch (error) {
        console.error(error);
    }
};

export default connectDb;