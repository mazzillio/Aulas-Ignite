import crypto from "crypto";
import multer from "multer";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

export default {
  upload(folder: string) {
    const filename = fileURLToPath(import.meta.url);
    const Dirname = dirname(filename);
    return {
      storage: multer.diskStorage({
        destination: resolve(Dirname, "..", "..", folder),
        filename: (req, file, call) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return call(null, fileName);
        },
      }),
    };
  },
};
