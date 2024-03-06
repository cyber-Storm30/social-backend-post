import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for handling file in-memory before uploading to Cloudinary

const multerConfig = multer({ storage: storage });

export default multerConfig;
