import mongoose from 'mongoose';
import 'dotenv/config';

async function conn() {
	try {
		await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
	} catch (error) {
		console.error(error);
	}
}

export default { conn };
