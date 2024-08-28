/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT as string,
  database_url: process.env.DATABASE_URL as string,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY as string,
};
