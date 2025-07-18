import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import multer from "multer";

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10, // 5MB por arquivo
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedMimes.includes(file.mimetype)) {
      return callback(
        new BadRequestError(
          "Invalid file type. Only JPEG, PNG and WEBP are allowed"
        )
      );
    }

    callback(null, true);
  },
});

export const uploadMultipleImages = multerUpload.array("images", 5);
