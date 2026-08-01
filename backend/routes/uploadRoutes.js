import express from "express";
import multer from "multer";
import path from "path";
import { put } from "@vercel/blob";
import { protect, admin } from "../middlewares/authMiddleware.js";

const uploadRouter = express.Router();

// Serverless filesystems are read-only, so the file is held in memory and
// streamed straight to Vercel Blob instead of being written to uploads/.
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("images only!"));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Writing to a billable Blob store must not be open to the public.
uploadRouter.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400);
        throw new Error("No image uploaded");
      }
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        res.status(500);
        throw new Error(
          "BLOB_READ_WRITE_TOKEN is not set - connect a Vercel Blob store"
        );
      }

      const filename = `image-${Date.now()}${path.extname(
        req.file.originalname
      )}`;

      const blob = await put(filename, req.file.buffer, {
        access: "public",
        contentType: req.file.mimetype,
      });

      // The client stores whatever string comes back as the product image src.
      res.send(blob.url);
    } catch (err) {
      next(err);
    }
  }
);

export default uploadRouter;
