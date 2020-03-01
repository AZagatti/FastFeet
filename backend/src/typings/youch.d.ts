declare module 'youch' {
  import { Errback, Response } from 'express';

  class Youch {
    constructor(err: Errback, res: Response);

    toJSON(): Promise<any>;
  }
  export default Youch;
}
