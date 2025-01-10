import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    
  };
}