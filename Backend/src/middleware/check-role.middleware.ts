import { NextFunction, Response } from 'express';

// Types
import { AuthRequest } from '../@types/auth.types.js';

const checkRole = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRoles = req.user.role;
    let isPermitted = true;

    roles.forEach((role) => {
      if (!userRoles[role]) {
        isPermitted = false;
      }
    });

    if (!isPermitted) {
      return res.status(403).json({ success: false, errors: ['You are not allowed to access this route!'] });
    }

    next();
  };
};

export default checkRole;
