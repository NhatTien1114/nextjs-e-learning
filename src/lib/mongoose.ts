"use server"

import mongoose from "mongoose"

// singleton connection
let isConnected: boolean = false;

export const connectToDatabase = async () => {
    const mongoUri = process.env.MONGODB_LOCAL?.trim().replace(/;$/, "");
    if (!mongoUri) {
        throw new Error("MONGODB is not set");
    }
    if (isConnected) {
        console.log("MONGODB is already connected");
    }

    try {
        await mongoose.connect(mongoUri, {
            dbName: "Ucademy"
        });
        isConnected = true;
        console.log("Using new database connection");
        return;
    } catch (error) {
        console.log("MONGODB is not connected");
        return;
    }
}