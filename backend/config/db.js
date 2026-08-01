import mongoose from "mongoose";

// Serverless functions are re-invoked on a warm container, so the connection is
// cached on globalThis to survive between invocations instead of dialling Atlas
// on every request.
let cached = globalThis._mongooseCache;
if (!cached) {
  cached = globalThis._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => {
        console.log(`Mongo connected ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        // Clear the cached promise so the next request retries instead of
        // replaying the same rejection forever.
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
