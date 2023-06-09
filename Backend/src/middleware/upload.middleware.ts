import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const today = new Date();
    const folderName = new Date(today.getFullYear(), today.getMonth(), 3).toISOString().slice(0, 7).replace('-', '');
    const dir = `./uploads/${folderName}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9) + '.' + file.mimetype.split('/')[1];
    cb(null, file.fieldname + '_' + uniqueSuffix);
  },
});

const checkFileType = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed ext
  const filetypes = /jpg|jpeg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('.jpg, .jpeg, .png , .gif format allowed!'));
  }
};

const UploadFiles = multer({ storage: storage, fileFilter: checkFileType });

export default UploadFiles;
