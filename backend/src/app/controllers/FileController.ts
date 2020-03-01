import { Response, Request } from 'express';

import File from '../models/File';

class FileController {
  public async store(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({ error: 'Insert the file field' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
