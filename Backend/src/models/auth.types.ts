import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
  type?: string;
  token?: string;
}
