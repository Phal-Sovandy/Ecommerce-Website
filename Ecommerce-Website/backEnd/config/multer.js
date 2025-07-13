import multer from "multer";
import path from "path";

const getStorage = (folder) =>
  multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, folder);
    },
    filename: (_, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      let prefix = "additional_image";

      if (file.fieldname === "image_url") {
        prefix = "main_image";
      } else if (file.fieldname === "profile_picture") {
        prefix = "profile_picture";
      }

      cb(null, prefix + "-" + uniqueSuffix + ext);
    },
  });

const fileFilter = (_, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const uploadProduct = multer({
  storage: getStorage("public/uploads/products"),
  fileFilter,
});

export const uploadSeller = multer({
  storage: getStorage("public/uploads/sellerProfiles"),
  fileFilter,
});

export const uploadCustomer = multer({
  storage: getStorage("public/uploads/customerProfiles"),
  fileFilter,
});
