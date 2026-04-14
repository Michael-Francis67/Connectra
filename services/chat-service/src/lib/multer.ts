import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fieldSize: 50 * 1024 * 1024, // 50mb
  },
});
