import crypto from "crypto";
import multer from "multer";
import { resolve,dirname } from "path";
import { fileURLToPath } from "url";

export default {
  upload(folder: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, call) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return call(null, fileName);
        },
      }),
    };
  },
};
