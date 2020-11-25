import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('[INFO] Connected to MongoDB');
  } catch (e) {
    console.log('[ERROR] Failed to connect to MongoDB');
  }
}

export default connect;
