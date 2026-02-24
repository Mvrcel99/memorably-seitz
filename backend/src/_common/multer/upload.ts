import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerOptions = (folder: 'hotel' | 'room', idParamName: string) => ({
  storage: diskStorage({
    destination: `./uploads/${folder}`,
    filename: (req, file, cb) => {
      const id = req.params[idParamName] || 'unknown';
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${id}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(webp)$/)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Nur Bilddateie (webp) ist erlaubt!'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
});