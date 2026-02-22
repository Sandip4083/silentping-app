import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const ConnectionObject: ConnectionObject = {};

export async function dbConnect() {
    if (ConnectionObject.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        ConnectionObject.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failed", error);
        process.exit(1);
    }
}

export default dbConnect;