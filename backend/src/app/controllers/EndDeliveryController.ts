import { Response, Request } from 'express';

class StartDeliveryController {
  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }
}

export default new StartDeliveryController();
