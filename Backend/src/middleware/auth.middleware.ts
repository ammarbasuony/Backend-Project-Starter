import { NextFunction, Response, Request } from 'express';
import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
  type?: string;
  token?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.header('Authorization');
  const getToken = auth ? auth.split(' ') : [];
  const token = getToken.pop();

  if (!token) {
    return res.status(401).json({ success: false, errors: ['Unauthorized'] });
  }

  jwt.verify(token, process.env.JWT_USER_SECRET as Secret | GetPublicKeyOrSecret, (err, decodedToken: any) => {
    if (err) {
      return res.status(401).json({ success: false, errors: ['Unauthorized'] });
    }

    req.user = decodedToken.data;
    req.type = decodedToken.data.type;
    req.token = token;

    next();
  });
};

export default auth;
