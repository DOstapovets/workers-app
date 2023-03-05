import { v4 as uuid } from 'uuid';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, uuid());
  },
});

export default multer({ storage });
